# 🎌 AnimeSearch 2025 - Modern Redesign

Un motore di ricerca moderno e potente per anime con supporto per streaming SUB ITA/ITA.

## ✨ Novità nella versione 2025

### 🎨 Design
- **Interfaccia moderna** con glassmorphism e gradienti
- **Animazioni fluide** e micro-interazioni per una UX superiore
- **Tema dark elegante** ottimizzato per la visualizzazione
- **Design completamente responsive** per tutti i dispositivi
- **Loading states** e skeleton screens
- **Toast notifications** per feedback immediato

### ⚡ Funzionalità Nuove

#### Sistema di Ricerca Avanzato
- ✅ Ricerca migliorata con gestione errori
- ✅ Bottone per pulire la ricerca rapidamente
- ✅ Feedback visivo durante il caricamento

#### Filtri e Ordinamento
- 🔍 **Filtra per status**: In Onda, Conclusi, Tutti
- ⭐ **Filtra per score**: Seleziona il punteggio minimo
- 📊 **Ordina risultati**: Per rilevanza, score o titolo
- 🔄 Applicazione filtri in tempo reale

#### Sistema Preferiti
- ❤️ Aggiungi/rimuovi anime dai preferiti
- 💾 Salvataggio locale (localStorage)
- 📱 Visualizzazione rapida di tutti i preferiti
- 🔔 Contatore preferiti sempre visibile

#### Modal Dettagli
- ℹ️ Visualizzazione dettagli completi
- 📝 Sinossi, generi, studio, episodi
- 🖼️ Immagini ad alta qualità
- ✨ Animazioni eleganti

#### Esperienza Utente
- ⌨️ **Scorciatoie tastiera**: 
  - `ESC` per chiudere modal
  - `Ctrl/Cmd + K` per focus ricerca
- 📱 Design ottimizzato per mobile
- 🚀 Performance migliorate
- 🎯 Accessibilità migliorata

## 🎯 Siti di Streaming Supportati

1. **AnimeSaturn** - Ampia collezione di anime sub ITA
2. **AnimeUnity** - Streaming anime di qualità
3. **SocialAnime** - Community e streaming
4. **AnimeHD ITA** - Alta definizione
5. **Yamato Video** - Canale YouTube ufficiale

## 📁 Struttura del Progetto

```
animesearch-updated/
├── index.html          # Pagina principale
├── css/
│   └── main.css       # Stili moderni
├── js/
│   └── main.js        # Logica applicazione
└── src/
    ├── taiga.png      # Logo/mascotte
    └── taiga-footer.png
```

## 🚀 Come Usare

1. **Apri** `index.html` nel browser
2. **Cerca** un anime nel campo di ricerca
3. **Applica filtri** per raffinare i risultati
4. **Clicca** sulle icone streaming per guardare
5. **Aggiungi** ai preferiti cliccando il cuore
6. **Visualizza dettagli** cliccando l'icona info

## 🔧 Requisiti

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet per API MyAnimeList (Jikan)
- JavaScript abilitato

## 🎨 Personalizzazione

### Colori (CSS Variables)
```css
--primary-color: #6366f1;
--secondary-color: #8b5cf6;
--accent-color: #ec4899;
```

### Modificare l'API Key
Nel file `js/main.js`, cerca e sostituisci:
```javascript
"x-rapidapi-key": "TUA_API_KEY"
```

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

## 🔒 Privacy & Sicurezza

- Non raccoglie dati personali
- Preferiti salvati solo localmente (localStorage)
- Link esterni aperti in nuove tab
- Nessun cookie di tracciamento

## 🐛 Risoluzione Problemi

### La ricerca non funziona
- Verifica la connessione internet
- Controlla la validità dell'API key
- Verifica la console del browser per errori

### I preferiti non vengono salvati
- Assicurati che JavaScript sia abilitato
- Verifica che il browser supporti localStorage
- Controlla le impostazioni privacy del browser

## 📝 Changelog

### v2.0 (2025)
- ✨ Redesign completo dell'interfaccia
- 🎯 Sistema filtri avanzato
- ❤️ Sistema preferiti con localStorage
- 📱 Modal dettagli anime
- 🎨 Animazioni e transizioni fluide
- 🔔 Toast notifications
- ⌨️ Keyboard shortcuts
- 📱 Responsive design migliorato

### v1.0 (2021)
- 🎬 Ricerca anime di base
- 🔗 Link ai siti di streaming
- 📊 Visualizzazione card

## 👨‍💻 Autore

**Luca Mastroianni | BlueMoon**
- Twitter: [@BlueMoon_Coder](https://twitter.com/BlueMoon_Coder)

## 📄 Licenza

Copyright © 2025 BlueMoon. All Rights Reserved.

## 🙏 Riconoscimenti

- **Jikan API** - MyAnimeList API non ufficiale
- **Font Awesome** - Icone
- **Google Fonts** - Typography (Poppins)
- **Taiga Aisaka** - Mascotte del progetto

## 🔗 Link Utili

- [Jikan API Documentation](https://jikan.moe/)
- [MyAnimeList](https://myanimelist.net/)
- [Privacy Policy](https://www.privacypolicies.com/live/7db480d4-e153-4a6d-a762-d682091f0152)

---

Made with ❤️ and ☕ by BlueMoon
