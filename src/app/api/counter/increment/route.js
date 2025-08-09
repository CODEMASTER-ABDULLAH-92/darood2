import { connectDB } from "@/lib/mongodb";
import Counter from "@/lib/counterModel";

export async function POST(req) {
  const { amount } = await req.json();

  if (!amount || isNaN(amount)) {
    return new Response(JSON.stringify({ message: "Invalid amount" }), { status: 400 });
  }

  await connectDB();

  let counter = await Counter.findOne();
  if (!counter) {
    counter = await Counter.create({ value: 0 });
  }

  counter.value += amount;
  counter.updatedAt = new Date();
  await counter.save();

  return Response.json({
    message: `${amount} added successfully`,
    value: counter.value,
    updatedAt: counter.updatedAt,
  });
}
