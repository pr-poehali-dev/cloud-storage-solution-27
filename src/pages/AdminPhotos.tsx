import { useState, useRef } from "react"
import Icon from "@/components/ui/icon"

const UPLOAD_URL = "https://functions.poehali.dev/afabb2f4-99b1-423d-bee9-009b9b4df0e1"

const ALBUMS = [
  "2025","2024","2023","2022","2021","2020","2019","2018","2017","2016",
  "2015","2014","2013","2012","2011","2010","2009","2008","Летопись"
]

interface FileItem {
  file: File
  preview: string
  status: "pending" | "uploading" | "done" | "error"
  error?: string
}

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res((r.result as string).split(",")[1])
    r.onerror = rej
    r.readAsDataURL(file)
  })
}

export default function AdminPhotos() {
  const [album, setAlbum] = useState("2025")
  const [files, setFiles] = useState<FileItem[]>([])
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const pickFiles = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.click()
    }
  }

  const onFilesSelected = (selected: FileList | null) => {
    if (!selected) return
    const images = Array.from(selected).filter(f => f.type.startsWith("image/"))
    setFiles(images.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      status: "pending",
    })))
  }

  const upload = async () => {
    const pending = files.filter(f => f.status === "pending")
    if (!pending.length || uploading) return
    setUploading(true)

    for (const item of pending) {
      setFiles(prev => prev.map(f => f.file === item.file ? { ...f, status: "uploading" } : f))
      try {
        const data = await toBase64(item.file)
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            album,
            files: [{ name: item.file.name, data, ext: item.file.name.split(".").pop() || "jpg", mime: item.file.type || "image/jpeg" }]
          }),
        })
        const json = await res.json()
        const err = json.errors?.[0]
        setFiles(prev => prev.map(f =>
          f.file === item.file
            ? err ? { ...f, status: "error", error: err.error } : { ...f, status: "done" }
            : f
        ))
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        setFiles(prev => prev.map(f => f.file === item.file ? { ...f, status: "error", error: msg } : f))
      }
    }
    setUploading(false)
  }

  const pendingCount = files.filter(f => f.status === "pending").length
  const doneCount = files.filter(f => f.status === "done").length
  const errorCount = files.filter(f => f.status === "error").length

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#0e0a04", color: "#f5d5b0" }}>
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,160,32,0.15)", border: "1px solid rgba(200,160,32,0.3)" }}>
            <Icon name="Images" size={20} style={{ color: "#c8a020" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#f5d5b0" }}>Загрузка фотографий</h1>
            <p className="text-sm" style={{ color: "rgba(245,213,176,0.5)" }}>Выберите альбом и добавьте фото</p>
          </div>
        </div>

        {/* Album selector */}
        <div className="rounded-2xl p-6 space-y-3" style={{ background: "rgba(60,35,10,0.4)", border: "1px solid rgba(140,90,30,0.3)" }}>
          <label className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(200,160,32,0.8)" }}>Альбом</label>
          <div className="flex flex-wrap gap-2">
            {ALBUMS.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setAlbum(a)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: album === a ? "rgba(200,160,32,0.25)" : "rgba(60,35,10,0.5)",
                  border: `1px solid ${album === a ? "rgba(200,160,32,0.6)" : "rgba(140,90,30,0.3)"}`,
                  color: album === a ? "#c8a020" : "rgba(245,213,176,0.6)",
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <p className="text-sm" style={{ color: "rgba(200,160,32,0.7)" }}>Выбран: <b>{album}</b></p>
        </div>

        {/* File picker */}
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => onFilesSelected(e.target.files)}
          />
          <button
            type="button"
            onClick={pickFiles}
            className="w-full rounded-2xl p-8 text-center transition-all hover:opacity-80"
            style={{ border: "2px dashed rgba(200,160,32,0.4)", background: "rgba(60,35,10,0.2)" }}
          >
            <Icon name="Upload" size={32} style={{ color: "rgba(200,160,32,0.6)", margin: "0 auto 10px" }} />
            <p className="font-medium" style={{ color: "#f5d5b0" }}>Нажмите чтобы выбрать фото</p>
            <p className="text-sm mt-1" style={{ color: "rgba(245,213,176,0.4)" }}>JPG, PNG, WEBP</p>
          </button>

          {files.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span style={{ color: "rgba(245,213,176,0.6)" }}>Выбрано: <b style={{ color: "#f5d5b0" }}>{files.length}</b></span>
                  {doneCount > 0 && <span style={{ color: "#4ade80" }}>✓ Загружено: {doneCount}</span>}
                  {errorCount > 0 && <span style={{ color: "#f87171" }}>✗ Ошибок: {errorCount}</span>}
                </div>
                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="text-sm px-3 py-1.5 rounded-lg"
                  style={{ color: "rgba(245,213,176,0.5)", border: "1px solid rgba(140,90,30,0.3)" }}
                >
                  Очистить
                </button>
              </div>

              <button
                type="button"
                onClick={upload}
                disabled={uploading || pendingCount === 0}
                className="w-full py-3 rounded-xl font-semibold text-base transition-opacity disabled:opacity-40"
                style={{ background: "rgba(200,160,32,0.9)", color: "#1a0e00" }}
              >
                {uploading ? "Загружаю..." : `Загрузить ${pendingCount} фото в альбом «${album}»`}
              </button>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {files.map((f, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden" style={{ border: "1px solid rgba(140,90,30,0.3)" }}>
                    <img src={f.preview} alt="" className="w-full h-full object-cover" />
                    {f.status === "uploading" && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <Icon name="Loader" size={20} style={{ color: "#c8a020" }} />
                      </div>
                    )}
                    {f.status === "done" && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#4ade80" }}>
                          <Icon name="Check" size={16} style={{ color: "#fff" }} />
                        </div>
                      </div>
                    )}
                    {f.status === "error" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2" style={{ background: "rgba(0,0,0,0.7)" }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#f87171" }}>
                          <Icon name="X" size={16} style={{ color: "#fff" }} />
                        </div>
                        {f.error && <p className="text-center text-red-300 leading-tight" style={{ fontSize: 9 }}>{f.error}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
