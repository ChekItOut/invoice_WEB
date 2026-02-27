// 견적서 조회 페이지
interface PageProps {
  params: { id: string };
}

export default function InvoicePage({ params }: PageProps) {
  return (
    <div className="container max-w-screen-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold">견적서 조회: {params.id}</h1>
      <p className="text-muted-foreground mt-2">
        견적서 상세 내용이 여기에 표시됩니다.
      </p>
    </div>
  );
}
