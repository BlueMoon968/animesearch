# 🎌 AnimeSearch 2025 - Modern Redesign

Un motore di ricerca moderno e potente per anime con integrazione completa **AniList** e streaming ufficiali.

## ✨ Caratteristiche Principali

### 🎮 Integrazione AniList
- **Liste Personali**: Watching, Completati, Da Vedere, In Pausa
- **Badge Utente**: Voto personale e progresso episodi
- **Statistiche**: Conteggio anime e score medio
- **API GraphQL**: Connessione diretta ufficiale (90 req/min)

### 🎬 Streaming Ufficiali
- Link diretti a **Crunchyroll**, **Netflix**, **Amazon Prime**, **Hulu**
- Caricamento automatico via API Jikan
- Fallback ricerca se non disponibili
- Solo provider legali

### 🔍 Ricerca Avanzata
- API **Jikan v4** gratuita (60 req/min)
- Filtri per status e score
- Ordinamento multiplo
- Nessuna API key richiesta

### ⚡ Funzionalità Moderne
- **Sistema Preferiti** con localStorage
- **Modal Dettagli** con sinossi completa
- **Toast Notifications** per feedback
- **Keyboard Shortcuts** (ESC, Ctrl+K)
- **Design Responsive** mobile-first

---

## 🚀 Quick Start

1. Apri `index.html` nel browser
2. **(Opzionale)** Inserisci username **AniList** nell'header
3. Clicca **Salva** per connettere il profilo
4. Usa i pulsanti per caricare le tue liste
5. Oppure cerca anime normalmente

---

## 📋 Come Usare AniList

### Setup Iniziale
1. Inserisci il tuo **username pubblico** AniList
2. Clicca il bottone **Salva**
3. Toast conferma: "Connesso: X anime"
4. Compaiono 4 pulsanti liste

### Caricare Liste
- **🎬 Watching** - Anime in corso con progresso
- **✅ Completati** - Anime finiti con voto
- **⏰ Da Vedere** - Plan to Watch
- **⏸️ In Pausa** - On Hold con progresso

### Badge sulle Card
Le card mostrano:
- ⭐ **Score Globale** (MyAnimeList/AniList)
- ❤️ **Tuo Voto** (1-10, se disponibile)
- 📺 **Progresso** (episodi visti, se disponibile)

---

## 🎨 Features Design

- **Dark Theme** con gradienti moderni
- **Glassmorphism** effects
- **Animazioni fluide** su hover e transizioni
- **Footer fisso** sempre visibile
- **Grid Layout** responsive automatico

---

## 🔧 Requisiti

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet
- JavaScript abilitato
- **(Opzionale)** Account AniList pubblico

---

## 🎯 Filtri Disponibili

- **Status**: Tutti / In Onda / Conclusi
- **Score Minimo**: 0+ / 6+ / 7+ / 8+ / 9+
- **Ordina**: Rilevanza / Score ↓ / Score ↑ / A-Z

---

## 📱 Responsive Design

- **Desktop**: Grid 4-5 colonne
- **Tablet**: Grid 2-3 colonne
- **Mobile**: Grid 1-2 colonne
- Footer ottimizzato per tutti i dispositivi

---

## 🔒 Privacy

- **Nessun tracking**: Zero cookie di terze parti
- **LocalStorage**: Solo preferiti e username (locale)
- **AniList**: Solo lettura dati pubblici
- **No Auth**: Nessuna password richiesta

---

## 🌐 API Utilizzate

### Jikan v4 (MyAnimeList)
- **URL**: `https://api.jikan.moe/v4`
- **Limite**: 60 richieste/minuto
- **Costo**: Gratuita
- **Auth**: Non richiesta

### AniList GraphQL
- **URL**: `https://graphql.anilist.co`
- **Limite**: 90 richieste/minuto
- **Costo**: Gratuita
- **Auth**: Non richiesta (solo dati pubblici)

---

## ⌨️ Keyboard Shortcuts

| Tasto | Azione |
|-------|--------|
| `ESC` | Chiudi modal dettagli |
| `Ctrl + K` | Focus ricerca |
| `Cmd + K` | Focus ricerca (Mac) |

---

## 📂 Struttura Progetto

```
animesearch-updated/
├── index.html              # Pagina principale
├── css/
│   └── main.css           # Stili moderni (~1000 righe)
├── js/
│   └── main.js            # Logica applicazione (~600 righe)
├── src/
│   ├── taiga.png          # Logo
│   └── taiga-footer.png   # Mascotte footer
├── README.md              # Questo file
├── CHANGELOG.md           # Storia versioni
├── ANILIST-GUIDE.md       # Guida AniList dettagliata
└── GUIDA-RAPIDA.md        # Quick start
```

---

## 🐛 Troubleshooting

### AniList non carica
- Verifica username corretto (case-sensitive)
- Profilo deve essere pubblico
- Controlla console browser (F12)

### Streaming non appaiono
- Alcuni anime non hanno provider
- Appare fallback ricerca Crunchyroll/Netflix
- Attendi caricamento (può richiedere 2-3 sec)

### Preferiti non salvati
- Browser in modalità normale (no incognito)
- LocalStorage abilitato
- Spazio storage disponibile

---

## 📊 Statistiche Progetto

- **Linee CSS**: ~1000
- **Linee JavaScript**: ~600
- **API Integrate**: 2 (Jikan v4 + AniList)
- **Features**: 20+
- **Responsive Breakpoints**: 3

---

## 🔮 Roadmap Futura

- [ ] PWA Support (installabile)
- [ ] Dark/Light mode toggle
- [ ] Export/Import liste
- [ ] Notifiche nuovi episodi
- [ ] Watchlist avanzata
- [ ] Sincronizzazione AniList bidirezionale

---

## 👨‍💻 Autore

**Luca Mastroianni | BlueMoon**
- Twitter: [@BlueMoon_Coder](https://twitter.com/BlueMoon_Coder)

---

## 📄 Licenza

Copyright © 2025 BlueMoon. All Rights Reserved.

---

## 🙏 Credits

- **Jikan API** - MyAnimeList API non ufficiale
- **AniList** - Piattaforma anime e API GraphQL
- **Font Awesome** - Icone
- **Google Fonts** - Typography (Poppins)
- **Taiga Aisaka** - Mascotte progetto

---

## 📚 Documentazione Aggiuntiva

- [CHANGELOG.md](./CHANGELOG.md) - Storia completa versioni
- [ANILIST-GUIDE.md](./ANILIST-GUIDE.md) - Guida dettagliata AniList
- [GUIDA-RAPIDA.md](./GUIDA-RAPIDA.md) - Quick start italiano

---

**Versione Attuale:** 2.3.0  
**Ultimo Aggiornamento:** Novembre 2025

Made with ❤️ and ☕ by BlueMoon
