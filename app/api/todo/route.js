import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
	    await prisma.$connect();
		console.log("mongodb connected");

        const todos = await prisma.todo.findMany()
        console.log(todos)

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (req) => {
	try {
		const { text, dateTime, status, isEdit  } = await req.json();

		await prisma.$connect();

		const newTodo = await prisma.todo.create({
			data: {
				text,
                dateTime,
                status,
                isEdit
			}
		});

		return NextResponse.json({ newTodo }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const PUT = async (req) => {
	try {
		const { id, text } = await req.json();
        console.log('id', id)
        console.log('text', text)

		await prisma.$connect();

		await prisma.todo.update({
			where: {
				id,
			},
			data: {
				text,
			},
		});

		const todos = await prisma.todo.findMany();

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const DELETE = async (req) => {
	try {
		const { id } = await req.json();
		await prisma.$connect();

		await prisma.todo.delete({
			where: {
				id,
			},
		});

		const todos = await prisma.todo.findMany();

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error) {
		console.log("error.message", error.message);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};