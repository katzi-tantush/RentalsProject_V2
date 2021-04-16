﻿using CarRentalDB.Contracts;
using CarRentalDB.Models;
using CarRentalDB.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarRentalDB.Controllers
{
    // TODO: only users and admins can delete users and get user data
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        CarRentalDbContext RentalsDb;
        IConfiguration Config;

        public UsersController(IConfiguration c)
        {
            RentalsDb = new CarRentalDbContext();
            Config = c;
        }

        [HttpGet]
        //[Authorize(Roles = "Employee, Manager")]
        public IActionResult Get()
        {
            return Ok(RentalsDb.Users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Employee, Manager")]
        public IActionResult Get(int id)
        {
            return RentalsDb.GetResultByID<User>(id);
        }


        // gets a new user, if the username does not exist in the db, adds the user to db
        [HttpPost]
        public IActionResult Post([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return RentalsDb.Post<User>("Users", newUser);
        }

        // gets a user and returns token appropriate to "Role"
        [HttpPost("login")]
        public IActionResult GetToken(RegisteredUser registeredUser)
        {
            IActionResult response = Unauthorized();
            var matchingUserNames = RentalsDb.Users
                .Where(user => user.UserName == registeredUser.UserName);

            var existingUser = matchingUserNames
                .FirstOrDefault(user => user.Password == registeredUser.Password);

            if(existingUser!=null)
            { 
                var secretKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Config["jwtConfig:SecretKey"]));

                var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, "clientClaims"),
                        new Claim(ClaimTypes.Name, existingUser.UserName),
                        new Claim(ClaimTypes.Role, existingUser.Role),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                var securityToken = new JwtSecurityToken(
                    issuer: Config["jwtConfig:Issuer"],
                    audience: Config["jwtConfig:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials
                    );

                var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

                response = Ok(new { responseToken = token, requestingUser = existingUser });
            }

            return response;
        }

        [HttpPut]
        [Authorize(Roles = "Manager, User")]
        public IActionResult Put([FromBody] User modifiedUser)
        {
            return RentalsDb.Put<User>(modifiedUser);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager, Manager")]
        public IActionResult Delete(int id)
        {
            return RentalsDb.Delete<User>(id);
        }
    }
}
