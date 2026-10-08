"use client";

import { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { isUploadBatchTooLarge, readApiJson } from "@/lib/read-api-json";

export default function BulkImageUpload() {
  const [files, setFiles] = useState([]);
  const [append, setAppend] = useState(false);
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  async function removeImage(item, imageIndex) {
    const key = `${item.type}:${item.id}:${imageIndex}`;
    setDeleting(key);
    setError("");
    try {
      const response = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: item.type, itemId: item.id, imageIndex }),
      });
      const result = await readApiJson(response);
      if (!response.ok) throw new Error(result.error || "Could not delete the image.");
      setReport((previous) => ({
        ...previous,
        attached: previous.attached.map((entry) =>
          entry.id === item.id && entry.type === item.type
            ? { ...entry, images: result.images }
            : entry,
        ),
      }));
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete the image.");
    } finally {
      setDeleting("");
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (!files.length || busy) return;
    const form = event.currentTarget;

    setError("");
    setReport(null);

    if (isUploadBatchTooLarge(files)) {
      setError("The total image upload must be under 4 MB. Upload a smaller batch.");
      return;
    }

    setBusy(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.set("append", String(append));

    try {
      const response = await fetch("/api/admin/images/bulk", {
        method: "POST",
        body: formData,
      });
      const result = await readApiJson(response);
      if (!response.ok && response.status !== 207) {
        throw new Error(result.error || "The bulk image upload failed.");
      }
      setReport(result);
      setFiles([]);
      form.reset();
    } catch (uploadError) {
      setError(uploadError.message || "The bulk image upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#173719]">Bulk product &amp; combo images</h2>
        <p className="mt-1 text-sm text-[#667E6A]">
          Filenames should match a product slug or combo code/slug. Upload up to 20 images with a total size under 4 MB.
        </p>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/webp,image/png,image/jpeg"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 20))}
          className="block w-full rounded-xl border border-[#E5E7EB] p-3 text-sm"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-[#425344]">
            <input
              type="checkbox"
              checked={append}
              onChange={(event) => setAppend(event.target.checked)}
            />
            Keep existing images and append matches
          </label>
          <button
            type="submit"
            disabled={!files.length || busy}
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4620] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={16} aria-hidden="true" />
            {busy ? "Uploading..." : `Upload ${files.length || ""} images`}
          </button>
        </div>
      </form>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {report && (
        <div aria-live="polite" className="mt-5 space-y-2 border-t border-[#E5E7EB] pt-4 text-sm">
          <p className="font-semibold text-[#173719]">
            Uploaded and attached: {report.uploaded}; matched: {report.matched.length}; unmatched: {report.unmatched.length}; failed: {report.failed.length}
          </p>
          {report.unmatched.length > 0 && (
            <p className="text-amber-800">Unmatched: {report.unmatched.join(", ")}</p>
          )}
          {report.failed.length > 0 && (
            <ul className="list-inside list-disc text-red-700">
              {report.failed.map((item, index) => (
                <li key={`${item.file}-${index}`}>{item.file}: {item.error}</li>
              ))}
            </ul>
          )}
          {report.matched.length > 0 && (
            <p className="text-[#667E6A]">
              Attached to: {report.matched.map((item) => `${item.code} (${item.type})`).join(", ")}
            </p>
          )}
          {report.attached?.map((item) => (
            <div key={`${item.type}:${item.id}`} className="space-y-2 pt-2">
              <p className="font-semibold text-[#425344]">{item.code} · {item.type}</p>
              <div className="flex flex-wrap gap-2">
                {item.images.map((url, imageIndex) => {
                  const key = `${item.type}:${item.id}:${imageIndex}`;
                  return (
                    <div key={`${url}-${imageIndex}`} className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] p-2">
                      <span className="max-w-48 truncate text-xs">{url.split("/").at(-1)}</span>
                      <button
                        type="button"
                        disabled={deleting === key}
                        onClick={() => removeImage(item, imageIndex)}
                        aria-label={`Delete image ${imageIndex + 1} for ${item.code}`}
                        className="text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
