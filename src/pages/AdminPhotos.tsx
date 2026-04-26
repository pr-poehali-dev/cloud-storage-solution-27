import { useState, useRef, useCallback } from "react"
import Icon from "@/components/ui/icon"

const UPLOAD_URL = "https://functions.poehali.dev/afabb2f4-99b1-423d-bee9-009b9b4df0e1"
const LIST_URL = "https://functions.poehali.dev/23053f98-85ac-4dbb-81fb-073764742665"

const ALBUM_YEARS = ["2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008"]
const ALBUMS = [
  ...ALBUM_YEARS.map(y => ({ id: y, label: y, prefix: `${y}/` })),
  { id: "Летопись", label: "Летопись", prefix: "Летопись/" },
]

interface FileItem {
  file: File
  preview: string
  status: "pending" | "uploading" | "done" | "error"
  url?: string
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
  const [album, setAlbum] = useState(ALBUMS[0].id)
  const [files, setFiles] = useState<FileItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [albumCounts, setAlbumCounts] = useState<Record<string, number>>({})
  const [loadingCounts, setLoadingCounts] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const addFiles = (newFiles: File[]) => {
    const images = newFiles.filter(f => f.type.startsWith("image/"))
    const items: FileItem[] = images.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      status: "pending",
    }))
    setFiles(items)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    addFiles(Array.from(e.dataTransfer.files))
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const loadCounts = async () => {
    setLoadingCounts(true)
    const counts: Record<string, number> = {}
    await Promise.all(ALBUMS.map(async a => {
      try {
        const r = await fetch(`${LIST_URL}?prefix=${encodeURIComponent(a.prefix)}`)
        const d = await r.json()
        counts[a.id] = d.photos?.length ?? 0
      } catch { counts[a.id] = 0 }
    }))
    setAlbumCounts(counts)
    setLoadingCounts(false)
  }

  const upload = async () => {
    const pending = files.filter(f => f.status === "pending")
    if (!pending.length) return
    setUploading(true)

    for (const item of pending) {
      setFiles(prev => prev.map(f => f.file === item.file ? { ...f, status: "uploading" } : f))
      try {
        const data = await toBase64(item.file)
        console.log("[upload] sending", item.file.name, "to album:", album, "size:", data.length)
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ album, files: [{ name: item.file.name, data, ext: item.file.name.split(".").pop() || "jpg", mime: item.file.type || "image/jpeg" }] }),
        })
        const json = await res.json()
        console.log("[upload] response:", JSON.stringify(json))
        const uploaded = json.uploaded?.[0]
        const err = json.errors?.[0]
        setFiles(prev => prev.map(f => {
          if (f.file !== item.file) return f
          if (err) return { ...f, status: "error", error: err.error }
          return { ...f, status: "done", url: uploaded?.url }
        }))
        if (!err) {
          setTimeout(() => {
            setFiles(prev => prev.filter(f => f.file !== item.file))
          }, 1500)
        }
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

        {/* Header */}
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
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(60,35,10,0.4)", border: "1px solid rgba(140,90,30,0.3)" }}>
          <label className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(200,160,32,0.8)" }}>Альбом</label>
          <div className="flex flex-wrap gap-2">
            {ALBUMS.map(a => (
              <button
                key={a.id}
                onClick={() => setAlbum(a.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: album === a.id ? "rgba(200,160,32,0.25)" : "rgba(60,35,10,0.5)",
                  border: `1px solid ${album === a.id ? "rgba(200,160,32,0.6)" : "rgba(140,90,30,0.3)"}`,
                  color: album === a.id ? "#c8a020" : "rgba(245,213,176,0.6)",
                }}
              >
                {a.label}
                {albumCounts[a.id] !== undefined && (
                  <span className="ml-1.5 opacity-60">({albumCounts[a.id]})</span>
                )}
              </button>
            ))}
          </div>
          <button onClick={loadCounts} disabled={loadingCounts} className="text-xs flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <Icon name="RefreshCw" size={12} />
            {loadingCounts ? "Загрузка..." : "Обновить счётчики"}
          </button>
        </div>

        {/* Drop zone */}
        <div
          ref={dropRef}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="rounded-2xl p-10 text-center cursor-pointer transition-all hover:opacity-90"
          style={{ border: "2px dashed rgba(200,160,32,0.3)", background: "rgba(60,35,10,0.2)" }}
        >
          <Icon name="Upload" size={32} style={{ color: "rgba(200,160,32,0.5)", margin: "0 auto 12px" }} />
          <p className="font-medium mb-1" style={{ color: "#f5d5b0" }}>Перетащите фото сюда или нажмите</p>
          <p className="text-sm" style={{ color: "rgba(245,213,176,0.4)" }}>JPG, PNG, WEBP — любое количество</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => { addFiles(Array.from(e.target.files || [])); e.target.value = "" }}
          />
        </div>

        {/* Stats + actions */}
        {files.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-4 text-sm">
              <span style={{ color: "rgba(245,213,176,0.6)" }}>Всего: <b style={{ color: "#f5d5b0" }}>{files.length}</b></span>
              {doneCount > 0 && <span style={{ color: "#4ade80" }}>Загружено: <b>{doneCount}</b></span>}
              {errorCount > 0 && <span style={{ color: "#f87171" }}>Ошибок: <b>{errorCount}</b></span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiles([])}
                className="px-4 py-2 rounded-xl text-sm"
                style={{ background: "rgba(60,35,10,0.5)", border: "1px solid rgba(140,90,30,0.3)", color: "rgba(245,213,176,0.6)" }}
              >
                Очистить
              </button>
              <button
                onClick={upload}
                disabled={uploading || pendingCount === 0}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-50"
                style={{ background: "rgba(200,160,32,0.85)", color: "#1a0e00" }}
              >
                {uploading ? "Загружаю..." : `Загрузить ${pendingCount} фото в «${album}»`}
              </button>
            </div>
          </div>
        )}

        {/* File grid */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {files.map((f, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group" style={{ border: "1px solid rgba(140,90,30,0.3)" }}>
                <img src={f.preview} alt="" className="w-full h-full object-cover" />
                {/* Overlay by status */}
                {f.status === "uploading" && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Icon name="Loader" size={20} style={{ color: "#c8a020" }} />
                  </div>
                )}
                {f.status === "done" && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(74,222,128,0.9)" }}>
                      <Icon name="Check" size={14} style={{ color: "#fff" }} />
                    </div>
                  </div>
                )}
                {f.status === "error" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,113,113,0.9)" }}>
                      <Icon name="X" size={14} style={{ color: "#fff" }} />
                    </div>
                    {f.error && (
                      <p className="text-center leading-tight" style={{ fontSize: 9, color: "#fca5a5", wordBreak: "break-all" }}>{f.error}</p>
                    )}
                  </div>
                )}
                {/* Remove btn */}
                {f.status === "pending" && (
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.7)" }}
                  >
                    <Icon name="X" size={12} style={{ color: "#fff" }} />
                  </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-center" style={{ background: "rgba(0,0,0,0.5)", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>
                  {f.file.name.length > 14 ? f.file.name.slice(0, 11) + "…" : f.file.name}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back link */}
        <a href="/#history" className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-80 transition-opacity" style={{ color: "#f5d5b0" }}>
          <Icon name="ArrowLeft" size={14} />
          Вернуться на сайт
        </a>
      </div>
    </div>
  )
}