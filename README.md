# SnailBet & SnailPay Gateway Platform

Plataforma web Full-Stack de carreras de caracoles, apuestas deportivas y pasarela de pagos integrada (**SnailPay**).

---

## 1. Arquitectura del Monorepo

El proyecto utiliza una arquitectura de **Monorepo** gestionado con `pnpm workspaces`:

* **`shared/` (`@app/shared`):** Single Source of Truth con contratos TypeScript, DTOs y esquemas de validación con Zod compartidos entre frontend y backend.
* **`server/` (`@app/server`):** Backend en **Express + TypeScript** estructurado bajo arquitectura limpia (Controller -> Service -> Zod Validation Middleware) que implementa el servicio de cobro transaccional SnailPay.
* **`client/` (`@app/client`):** Frontend en **React + Vite + TypeScript + Tailwind CSS** con autenticación criptográfica (SHA-256 + Salt con Web Crypto API), persistencia en LocalStorage, dashboard reactivo con gráficas interactivas (Recharts) y 5 vistas detalladas de análisis.

---

## 2. Requisitos Previos

* **Node.js:** >= 18.x
* **pnpm:** >= 9.x (o `npm install -g pnpm`)

---

## 3. Instalación y Puesta en Marcha

### Instalación de dependencias:
```bash
pnpm install
```

### Ejecución en entorno local:
Para iniciar simultáneamente el Backend (Express en puerto 3001) y el Frontend (Vite en puerto 5173 con proxy automático):

```bash
pnpm dev
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:3001`
* **Health Check:** `http://localhost:3001/health`

### Compilación para producción:
```bash
pnpm build
```

---

## 4. Pruebas Automatizadas

La suite incluye 22 pruebas automatizadas unitarias, de integración HTTP y de componentes:

```bash
pnpm test
```

* **`@app/shared`:** 11 pruebas (validación de esquemas Zod para autenticación y pagos).
* **`@app/server`:** 10 pruebas (servicio SnailPay, endpoints con Supertest, manejo de errores y validaciones).
* **`@app/client`:** Pruebas de renderizado y componentes con Vitest y Testing Library.

---

## 5. Tabla de Casos de Prueba para SnailPay

Para evaluar y reproducir las respuestas del servicio SnailPay en el modal de recarga, puedes utilizar las siguientes tarjetas:

| Escenario | Número de Tarjeta | Vencimiento | CVV | Monto | Resultado Esperado |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Cobro Exitoso** | `1234123412341234` | `12/26` | `543` | `$100.00` | **200 OK (Aprobado):** Saldo acreditado inmediatamente en LocalStorage. |
| **Rechazo por CVV** | `1234123412341234` | `12/26` | `999` | `$100.00` | **200 OK (Rechazado):** `status_detail: "Código de seguridad (CVV) inválido"`. Saldo no modificado. |
| **Rechazo por Vencimiento** | `1234123412341234` | `01/20` | `543` | `$100.00` | **200 OK (Rechazado):** `status_detail: "La tarjeta se encuentra vencida"`. Saldo no modificado. |
| **Tarjeta no Autorizada** | `4111111111111111` | `12/26` | `543` | `$100.00` | **200 OK (Rechazado):** `status_detail: "Fondos insuficientes o tarjeta no autorizada"`. |
| **Fallo del Sistema** | `4000123456789999` | `12/26` | `543` | `$100.00` | **500 Internal Server Error:** Simulación de indisponibilidad del gateway. |

*(El modal incluye botones de Auto-Fill para cargar estos casos con un solo clic).*

---

## 6. Despliegue en la Nube

* **Backend (Vercel Serverless):** Configurado mediante `vercel.json` y `api/index.ts`.
* **Frontend (Netlify):** Configurado con `netlify.toml` y `client/public/_redirects` para enrutamiento SPA.
