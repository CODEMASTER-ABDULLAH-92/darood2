import { connectDB } from "@/lib/mongodb";
import Counter from "@/lib/counterModel";

export async function GET() {
  await connectDB();

  let counter = await Counter.findOne();
  if (!counter) {
    counter = await Counter.create({ value: 100 }); // initial value
  }

  return Response.json({
    value: counter.value,
    updatedAt: counter.updatedAt,
  });
}
