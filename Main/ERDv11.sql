-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/DK2yeX
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXIST mls;
DROP TABLE IF EXIST school_rating;
DROP TABLE IF EXIST junction_table;

CREATE TABLE "mls" (
    "mls" int   NOT NULL,
    "street_number" varchar(6)   NOT NULL,
    "street_name" varchar(50)   NOT NULL,
    "city" varchar(25)   NOT NULL,
    "zip" int   NOT NULL,
    "county" varchar(20)   NOT NULL,
    "subdivision" varchar(250)   NOT NULL,
    "home_type" varchar(250)   NOT NULL,
    "year_built" int   NOT NULL,
    "bedrooms" int   NOT NULL,
    "full_baths" int   NOT NULL,
    "half_baths" int   NOT NULL,
    "total_baths" float   NOT NULL,
    "room_count" int   NOT NULL,
    "fireplaces" int   NOT NULL,
    "stories" int   NOT NULL,
    "pool_private" varchar(5)   NOT NULL,
    "garages" int   NOT NULL,
    "style" varchar(25)   NOT NULL,
    "list_price" int   NOT NULL,
    "market_area" varchar(35)   NOT NULL,
    "area" int   NOT NULL,
    "dom" int   NOT NULL,
    "cdom" int   NOT NULL,
    "list_date" varchar(25)   NOT NULL,
    "school_district" varchar(50)   NOT NULL,
    "elementary" varchar(25)   NOT NULL,
    "high_school" varchar(25)   NOT NULL,
    CONSTRAINT "pk_mls" PRIMARY KEY (
        "mls"
     )
);

SELECT * FROM mls;

CREATE TABLE "school_rating" (
    "campus_number" int   NOT NULL,
    "school" varchar(50)   NOT NULL,
    "district" varchar(50)   NOT NULL,
    "yrs_unacceptable" int   NOT NULL,
    "rating" varchar(20)   NOT NULL,
    "rating_yr" varchar(4)   NOT NULL,
    CONSTRAINT "pk_school_rating" PRIMARY KEY (
        "campus_number","school"
     )
);

SELECT * FROM school_rating;

CREATE TABLE "junction_table" (
    "mls" int   NOT NULL,
    "campus_number" int   NOT NULL
);

SELECT * FROM junction_table;

ALTER TABLE "junction_table" ADD CONSTRAINT "fk_junction_table_mls" FOREIGN KEY("mls")
REFERENCES "mls" ("mls");

ALTER TABLE "junction_table" ADD CONSTRAINT "fk_junction_table_campus_number" FOREIGN KEY("campus_number")
REFERENCES "school_rating" ("campus_number");


