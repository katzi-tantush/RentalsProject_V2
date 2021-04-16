﻿// <auto-generated />
using System;
using CarRentalDB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarRentalDB.Migrations
{
    [DbContext(typeof(CarRentalDbContext))]
    [Migration("20210215092526_Locations_table")]
    partial class Locations_table
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "Hebrew_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CarRentalDB.Models.Branch", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LocationID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("LocationID");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("CarRentalDB.Models.Car", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AvailableForRent")
                        .HasColumnType("bit");

                    b.Property<int?>("BranchID")
                        .HasColumnType("int");

                    b.Property<int?>("CarCategoryID")
                        .HasColumnType("int");

                    b.Property<int>("KillometerCount")
                        .HasColumnType("int");

                    b.Property<int>("LicensePlateNumber")
                        .HasColumnType("int");

                    b.Property<bool>("RentReady")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("BranchID");

                    b.HasIndex("CarCategoryID");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("CarRentalDB.Models.CarCategory", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Automatic")
                        .HasColumnType("bit");

                    b.Property<int>("DailyCost")
                        .HasColumnType("int");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OverdueDailyCost")
                        .HasColumnType("int");

                    b.Property<DateTime>("ProductionDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("CarCategories");
                });

            modelBuilder.Entity("CarRentalDB.Models.Location", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Latitude")
                        .HasColumnType("int");

                    b.Property<int>("Longitude")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("CarRentalDB.Models.Branch", b =>
                {
                    b.HasOne("CarRentalDB.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("CarRentalDB.Models.Car", b =>
                {
                    b.HasOne("CarRentalDB.Models.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("BranchID");

                    b.HasOne("CarRentalDB.Models.CarCategory", "CarCategory")
                        .WithMany()
                        .HasForeignKey("CarCategoryID");

                    b.Navigation("Branch");

                    b.Navigation("CarCategory");
                });
#pragma warning restore 612, 618
        }
    }
}
