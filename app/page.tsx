// https://reacthustle.com/blog/how-to-create-react-multiple-file-upload-using-nextjs-and-typescript

// app/page.tsx
import FileUploadForm from "@/components/FileUploadForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <FileUploadForm />
    </main>
  );
}