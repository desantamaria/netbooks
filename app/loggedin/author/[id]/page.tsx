"use client";

export default function AuthorPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Logged in</h3>
        <div>My Author: {params.id}</div>
      </div>
    </div>
  );
}
