CREATE TABLE t_p12009297_cloud_storage_soluti.photos (
    id SERIAL PRIMARY KEY,
    album TEXT NOT NULL,
    key TEXT NOT NULL,
    url TEXT NOT NULL,
    size INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);