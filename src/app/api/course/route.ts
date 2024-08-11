import mongoose from "mongoose";
import CourseModel from "@/models/Course";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("request: ", request.body);

  const {
    title,
    description,
    imageLink,
    coursePrice,
    premiumPrice,
    tags,
    downloadLink,
  } = await request.json();

  console.log("title: ", title);
  console.log("description: ", description);

  await dbConnect();

  try {
    const existingCourse = await CourseModel.findOne({
      $or: [{ title }],
    });

    console.log("existingCourse: ", existingCourse);

    if (existingCourse) {
      return NextResponse.json(
        {
          status: 400,
          message: "Course already exists",
        },
        {
          status: 400,
        }
      );
    }

    const newCourse = new CourseModel({
      title,
      description,
      imageLink,
      coursePrice,
      premiumPrice,
      tags,
      downloadLink,
    });

    const response = await newCourse.save();
    console.log("response: ", response);

    if (!response) {
      return NextResponse.json(
        {
          status: 400,
          message: "Course could not be created",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Course created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error in creating course: ", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
