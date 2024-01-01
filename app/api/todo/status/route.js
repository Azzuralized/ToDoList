import prisma from "@/prisma";
import { NextResponse } from "next/server";


export const PUT = async (req) => {
	try {
		const { id, status } = await req.json();
        console.log('id', id)
        console.log('status', status)

		await prisma.$connect();

		await prisma.todo.update({
			where: {
				id,
			},
			data: {
				status,
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