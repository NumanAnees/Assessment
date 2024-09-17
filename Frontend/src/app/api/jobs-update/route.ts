import { NextResponse } from "next/server";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendUpdate = (jobId: string, status: string) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ jobId, status })}\n\n`)
        );
      };

      setTimeout(() => sendUpdate("job1", "in_progress"), 2000);
      setTimeout(() => sendUpdate("job1", "completed"), 5000);

      const intervalId = setInterval(() => {
        controller.enqueue(encoder.encode(": keepalive\n\n"));
      }, 15000);

      return () => {
        clearInterval(intervalId);
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
