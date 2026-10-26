# PROJECT_MEMORY — miweb

Memoria persistente del proyecto. Actualizar este archivo cada vez que se agregue una feature, se cambie el stack o se tome una decisión de diseño.

---

## 1. Identidad del proyecto

| Campo | Valor |
|---|---|
| Nombre | `miweb` (package.json) |
| Marca en UI | SoporteTec (`src/config/site.js`) |
| Propósito | Plantilla web para ofrecer **servicios de soporte técnico**, diseñada de forma **modular** para escalar a más servicios en el futuro |
| Idioma | Español (es) |
| Estado actual | ✅ v1.1 — plantilla funcional + modo claro/oscuro |

---

## 2. Stack tecnológico

### Runtime
| Tecnología | Versión | Notas |
|---|---|---|
| React | **18.3.1** | Fijado a 18 a pedido del usuario (el scaffold Vite venía con React 19) |
| react-dom | 18.3.1 | `createRoot` API |
| React Router | **6.30.0** | `BrowserRouter` + `Routes`/`Route` (API v6) |
| Bootstrap | **5.3.7** | CSS importado en `main.jsx`. Peer dep `@popperjs/core` pendiente de instalar si se usan dropdowns/offcanvas en JS |
| bootstrap-icons | 1.13.1 | CSS + fuentes incluidas |

### Build & tooling
| Tecnología | Versión | Notas |
|---|---|---|
| Vite | 8.3.4 | `@vitejs/plugin-react` 6.1.2 |
| ESLint | 10.13 | Flat config (`eslint.config.js`), plugins react-hooks + react-refresh |
| Gestor de paquetes | **Yarn 1.22** | Hay `yarn.lock`. **No usar npm** (no existe package-lock.json) |
| Lenguaje | JavaScript (JSX) | Sin TypeScript |

### Scripts disponibles
```bash
yarn dev      # servidor de desarrollo
yarn build    # build de producción (verificado: OK)
yarn preview  # preview del build
yarn lint     # ESLint (verificado: sin errores)
```

### Decisiones de stack (historial)
- **React 18 en vez de 19**: el usuario pidió explícitamente React 18. Se hizo `yarn add react@^18.3.1 react-dom@^18.3.1`.
- **CSS puro de Bootstrap** (sin framework de utilidades adicional, sin Sass): suficiente para la plantilla y mantiene el stack simple.
- **Sin state management externo**: el estado es local (`useState`) y los servicios son datos estáticos importados. No hay backend ni API todavía.
- **Sin JavaScript de Bootstrap** (no se importa `bootstrap/dist/js/bootstrap.bundle`): el menú móvil usa los atributos `data-bs-toggle` de Bootstrap — si algún componente JS de Bootstrap falla, instalar `@popperjs/core` e importar el bundle en `main.jsx`.
- **Modo claro/oscuro con `data-bs-theme` nativo de Bootstrap 5.3** (sin librería de temas): contexto React en `src/hooks/useTheme.jsx`, persistencia en `localStorage` (`miweb-theme`), respeto de `prefers-color-scheme` en la primera visita y script inline en `index.html` para evitar flash de tema incorrecto.

---

## 3. Arquitectura y estructura

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          ← nav sticky, links + botón WhatsApp
│   │   ├── Footer.jsx          ← contacto, links de servicios, RRSS
│   │   └── Layout.jsx          ← Navbar + <main> + Footer, flex column min-vh-100
│   ├── common/
│   │   ├── ServiceCard.jsx     ← card de servicio (icono, short, link a detalle)
│   │   ├── Hero.jsx            ← hero con gradiente + stats + CTAs
│   │   └── SectionTitle.jsx    ← eyebrow + título + subtitle
│   └── forms/
│       └── ContactForm.jsx     ← validación + envío por WhatsApp
├── pages/
│   ├── Home.jsx                ← Hero + destacados + cómo trabajamos + form + CTA
│   ├── Services.jsx            ← listado completo de servicios
│   ├── ServiceDetail.jsx       ← detalle por :slug (breadcrumb, features, precio)
│   └── Contact.jsx             ← form + tarjeta con datos de contacto
├── services/                   ← 🔑 MÓDULOS DE SERVICIOS
│   ├── index.js                ← registro central (array `services`)
│   ├── soporteRemoto.js
│   ├── reparacionHardware.js
│   ├── redes.js
│   └── mantenimiento.js
├── hooks/
│   ├── useServices.js      ← useServices / useFeaturedServices / useService(slug)
│   └── useTheme.jsx        ← ThemeProvider + useTheme (contexto de tema claro/oscuro)
├── config/
│   └── site.js                 ← datos del negocio (nombre, tel, email, WhatsApp, horarios, RRSS)
├── App.jsx                     ← rutas
└── main.jsx                    ← createRoot + ThemeProvider + BrowserRouter + imports CSS
```

### Rutas
| Ruta | Página | Descripción |
|---|---|---|
| `/` | `Home` | Landing con hero, servicios destacados, pasos, formulario |
| `/servicios` | `Services` | Listado completo |
| `/servicios/:slug` | `ServiceDetail` | Detalle; 404 interno si el slug no existe |
| `/contacto` | `Contact` | Formulario + datos de contacto |
| `*` | 404 inline en `App.jsx` | Página no encontrada |

---

## 4. Sistema modular de servicios 🔑

Cada servicio es un **módulo independiente** exportando un objeto con esta forma:

```js
{
  id: 'soporte-remoto',          // único, kebab-case
  slug: 'soporte-remoto',        // usado en la URL /servicios/:slug
  title: 'Soporte Remoto',
  icon: 'bi-headset',            // clase de bootstrap-icons
  short: 'Una línea para cards',
  long: 'Descripción extendida (puede ser template literal multilinea)',
  features: ['...', '...'],      // lista para ServiceDetail
  price: { from: '15.000', currency: '$', unit: 'por sesión' },
  featured: true                 // aparece en Home
}
```

### Cómo agregar un nuevo servicio (pasos exactos)
1. Crear `src/services/miServicio.js` con el objeto de la forma de arriba.
2. Importarlo y agregarlo al array `services` en `src/services/index.js`.
3. (Opcional) Agregar el link en el Footer (`src/components/layout/Footer.jsx`).
4. Listo: Home, Services y ServiceDetail se actualizan solos.

Los servicios **no** se listan hardcodeados en ningún componente: todo pasa por `useServices()`.

---

## 5. Flujo de contacto / conversión

- `ContactForm` valida en cliente (nombre, email con regex, mensaje obligatorio).
- Al enviar, **abre WhatsApp** (`wa.me/{whatsapp}?text=...`) con el mensaje pre-armado. No hay backend.
- El éxito muestra un `alert-success` inline.
- CTAs de WhatsApp presentes en: Navbar, Hero, Home (footer CTA), ServiceDetail (botón contratar), Contact, Footer.

**Pendiente futuro:** integrar un backend o servicio tipo Formspree/EmailJS si se quiere envío por email real.

---

## 6. Modo claro / oscuro

**Cómo funciona:**
- `ThemeProvider` (`src/hooks/useTheme.jsx`) envuelve la app en `main.jsx` y setea `data-bs-theme="light"|"dark"` en `<html>`.
- El tema se guarda en `localStorage` con la clave `miweb-theme`; si no hay valor guardado, se usa `prefers-color-scheme` del sistema.
- Un script inline en `index.html` (antes del CSS) aplica el tema inicial para evitar flash blanco/oscuro al cargar.
- El toggle es un botón en el `Navbar` (ícono `bi-sun` / `bi-moon-stars`, clase `.theme-toggle`).

**Uso desde cualquier componente:**
```jsx
import { useTheme } from '../../hooks/useTheme';
const { theme, isDark, toggleTheme } = useTheme();
```

**Reglas de estilo para que todo funcione en ambos temas:**
- Texto secundario → usar `text-body-secondary` (adapta el color). **Nunca** `text-secondary` sobre fondo de página (queda gris fijo ilegible en oscuro).
- Secciones con fondo → usar `bg-body-tertiary` en vez de `bg-light`.
- Navbar → `bg-body` (no `bg-white`).
- Bloques siempre oscuros (Footer, Hero) → agregar `data-bs-theme="dark"` como anidamiento para que sus hijos resuelvan variables oscuras.
- Variantes de tema propio → selector `[data-bs-theme='dark'] …` en `src/index.css` (gradiente del hero, `.icon-box`, sombras `.hover-lift`).

---

## 7. Checklist de avance

### ✅ Completado (v1 — plantilla base)
- [x] Instalar React 18.3, Bootstrap 5.3, bootstrap-icons, React Router 6
- [x] Configurar `src/config/site.js` con datos del negocio
- [x] Sistema modular de servicios (4 servicios + registro central)
- [x] Hooks `useServices` / `useFeaturedServices` / `useService`
- [x] Layout: Navbar sticky responsive, Footer, Layout wrapper
- [x] Componentes comunes: Hero, ServiceCard, SectionTitle
- [x] ContactForm con validación y envío por WhatsApp
- [x] Páginas: Home, Services, ServiceDetail, Contact + 404
- [x] Ruteo con React Router
- [x] `index.html` en español con meta descripción y título
- [x] Estilos globales (`index.css`): hero gradient, hover-lift, icon-box
- [x] Verificación: `yarn lint` sin errores, `yarn build` OK
- [x] Modo claro/oscuro: ThemeProvider + toggle en Navbar, persistencia en localStorage, sin flash al cargar, estilos adaptados en ambos temas

### 🔜 Pendiente / ideas futuras
- [ ] Cambiar placeholder de marca "SoporteTec" y datos de `site.js` por los reales
- [ ] Agregar favicon propio (actualmente el default de Vite)
- [ ] Agregar más servicios al registro central
- [ ] Recordar preferencia de tema en el servidor/SSR si algún día se migra
- [ ] SEO: react-helmet o metas por página
- [ ] Analíticas (Plausible/GA)
- [ ] Backend o servicio de formularios para envío por email
- [ ] Importar JS de Bootstrap + `@popperjs/core` si se necesitan dropdowns/offcanvas interactivos
- [ ] Páginas "Sobre nosotros" / "FAQ"
- [ ] Test suite (Vitest + React Testing Library)
- [ ] Despliegue (Vercel / Netlify / hosting propio con `yarn build` → `dist/`)

---

## 8. Convenciones del proyecto

- **Idioma**: toda la UI y los comentarios en español.
- **Nombres de archivo**: PascalCase para componentes (`ServiceCard.jsx`), camelCase para módulos/utilidades (`soporteRemoto.js`, `useServices.js`).
- **Estilos**: clases de Bootstrap + utilidades propias mínimas en `index.css` (`.hero-section`, `.icon-box`, `.hover-lift`, `.text-secondary-light`, `.theme-toggle`). No hay CSS Modules ni styled-components. Precaución con el tema: ver reglas de la sección 6.
- **Iconos**: siempre `bootstrap-icons` via `<i className="bi bi-…" />`.
- **Paleta**: gradiente `--brand-gradient` (azul oscuro → `#0d6efd`), primario de Bootstrap.
- **Links externos**: siempre `target="_blank" rel="noreferrer"`.
- **Paquetes**: instalar **solo con yarn**.

---

## 9. Registro de cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Proyecto inicial: scaffold Vite + React 19 por defecto |
| 2026-10-26 | Downgrade a React 18.3.1 + instalación Bootstrap 5.3.7, bootstrap-icons 1.13.1, react-router-dom 6.30.0 |
| 2026-10-26 | Plantilla v1 completa: estructura modular de servicios, 4 servicios, 4 páginas, layout, formulario WhatsApp. Lint + build OK |
| 2026-10-26 | Creado `PROJECT_MEMORY.md` con stack y seguimiento de avance |
| 2026-10-26 | Modo claro/oscuro (v1.1): `ThemeProvider` + `useTheme` en `src/hooks/useTheme.jsx`, toggle en Navbar, persistencia en localStorage, script anti-flash en `index.html`, estilos adaptados (`bg-body-tertiary`, `text-body-secondary`, variantes `[data-bs-theme='dark']`). Lint + build OK |
