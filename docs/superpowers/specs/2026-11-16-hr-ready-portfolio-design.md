# HR-Ready Portfolio — Design
Tanggal: 2026-11-16 · Proyek: `F:\Portofolio\web` (rahmad-portfolio, repo `portfolio-3d`)

## Intent & why
Pengunjung (prioritas: HR/rekruter melamar magang/entry-level Web Developer) harus langsung menangkap kesan "orang ini profesional". Situs dipertahankan tema terang "kertas krem" (bg-paper/text-ink); yang diimpor dari web-v2 hanya 3 elemen, diadaptasi ke token terang.

## Goals
1. Hero scroll-driven: parallax + fade pada foto & headline saat di-scroll.
2. Custom cursor + noise texture halus (pointer:fine, hormati reduced-motion), diadaptasi ke tema terang.
3. Glass carousel Projects (dari web-v2), diadaptasi: CSS vars gelap → token terang; koeksistensi dgn FullpageProvider.
4. Section Awards: render data `awards` (Hafidz 30 Juz) yang selama ini menganggur di lib/data.ts; masuk registrasi section (FullpageProvider/Navbar/Sidebar/MenuOverlay) — atau gabung ke Journey bila lebih rapi (keputusan builder, tandai di PR).
5. HR-ready framing: copy project → mini case-study (masalah → solusi → dampak, jujur tanpa angka karangan), strip "Open to work" + CTA unduh CV menonjol.

## Non-goals / anti-goals
- Tidak mengubah tema jadi gelap; tidak OrbitCanvas; tidak marquee velocity; tidak menyentuh web-v2; tidak push/deploy.
- Jangan mengarang metrik dampak proyek.

## Constraints
- FullpageProvider: section diregistrasi via `data-section-index` & scroll-spy IntersectionObserver; urutan sekarang About(0) Work(1) Skills(2) Journey(3) Contact(4). Section baru harus menyisip tanpa merusak indeks & navigasi.
- Tailwind + token di tailwind.config.ts / globals.css; tidak ada hex literal di komponen baru (pakai token: accent, ink, paper, line, card, muted).
- framer-motion + gsap sudah terpasang. React 19 / Next 16.
- Aksesibilitas: hormati prefers-reduced-motion; carousel tetap keyboard-navigable (panah/Home/End) seperti aslinya; noise/cursor `aria-hidden`.

## Approaches (yang dipertimbangkan)
- A. Polish saja (tanpa impor): ditolak user — kurang "menarik".
- B. HR-ready + impor 3 elemen web-v2 diadaptasi tema terang: DIPILIH.
- C. Redesign gelap total: ditolak — melenceng dari audiens HR & mahal.

## Parts (keputusan yang sudah diambil user)
- Tema: adaptasi ke terang, bukan gelap.
- Hero: parallax + fade saat scroll (bukan marquee velocity / OrbitCanvas).
- Scope: 3 elemen impor + Awards + HR-ready framing (semua dipilih user).

## Left to builder
- Pemetaan persis CSS vars web-v2 → token web; penanganan konflik gesture drag carousel vs scroll section; posisi Awards (section sendiri vs gabung Journey); bundel copy case-study per project (pakai lib/data.ts + screenshots yang ada; tandai mana yang butuh input user).
