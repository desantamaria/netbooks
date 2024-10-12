"use client";

export default function PublisherPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Logged in</h3>
        <div>Publisher: {params.id}</div>
      </div>
    </div>
  );
}
