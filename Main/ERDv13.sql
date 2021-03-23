-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/DK2yeX
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS mls;
DROP TABLE IF EXISTS school_rating;
-- DROP TABLE school_rating CASCADE;
DROP TABLE IF EXISTS junction_table;
DROP TABLE IF EXISTS elementary_table;
-- DROP TABLE school_rating CASCADE;
DROP TABLE IF EXISTS high_school_table;
-- DROP TABLE school_rating CASCADE;

CREATE TABLE "mls" (
    "mls" int   NOT NULL,
    "street_number" int   NOT NULL,
    "street_name" varchar(50)   NOT NULL,
	"unit" varchar (50),
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
    "market_area" int   NOT NULL,
    "area" varchar(25)   NOT NULL,
    "dom" int   NOT NULL,
    "cdom" int   NOT NULL,
    "list_date" DATE DEFAULT ('now'::text)::date NOT NULL,
	"full_address" varchar (250) NOT NULL,
	"latitude" float NOT NULL,
	"longitude" float NOT NULL,
	"geocode" varchar (250) NOT NULL,
    "elementary" int   NOT NULL,
    "high_school" int   NOT NULL,
    CONSTRAINT "pk_mls" PRIMARY KEY (
        "mls"
     )
);

SELECT * FROM mls;

CREATE TABLE "junction_table" (
    "mls" int   NOT NULL,
    "campus_number" int   NOT NULL,
	CONSTRAINT "pk_junction_table" PRIMARY KEY (
        "mls"
     )
);

SELECT * FROM junction_table;

CREATE TABLE "school_rating" (
    "campus_number" int   NOT NULL,
    "school" varchar(50)   NOT NULL,
    "district" varchar(50)   NOT NULL,
    "yrs_unacceptable" int   NOT NULL,
    "rating" varchar(20)   NOT NULL,
    "rating_yr" int   NOT NULL,
    CONSTRAINT "pk_school_rating" PRIMARY KEY (
        "campus_number"
     )
);

SELECT * FROM school_rating;

CREATE TABLE "elementary_table" (
    "campus_number" int   NOT NULL,
    "elementary" varchar(50)   NOT NULL,
    "district" varchar(50)   NOT NULL,
    "yrs_unacceptable" int   NOT NULL,
    "rating" varchar(20)   NOT NULL,
	"rating_yr" int   NOT NULL,
	PRIMARY KEY ("campus_number"),
    FOREIGN KEY (campus_number) REFERENCES school_rating (campus_number)
);

SELECT * FROM elementary_table;

CREATE TABLE "high_school_table" (
    "campus_number" int   NOT NULL,
    "high_school" varchar(50)   NOT NULL,
    "district" varchar(50)   NOT NULL,
    "yrs_unacceptable" int   NOT NULL,
    "rating" varchar(20)   NOT NULL,
	"rating_yr" int   NOT NULL,
	PRIMARY KEY ("campus_number"),
    FOREIGN KEY (campus_number) REFERENCES school_rating (campus_number)
)

SELECT * FROM high_school_table;




