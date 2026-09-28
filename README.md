# Snail Racing Betting & SnailPay Gateway Platform

Plataforma web full-stack para la simulación de estadísticas de carreras de caracoles y pasarela de pagos simulada (**SnailPay**).

## 🚀 Arquitectura del Proyecto

El proyecto está estructurado como un **Monorepo** administrado con `pnpm workspaces`:

* `shared/`: Tipos TypeScript y esquemas de validación Zod compartidos entre frontend y backend (Clean Contracts / ISP).
* `server/`: Backend en **Express + TypeScript** que expone la API de simulación de pagos de SnailPay.
* `client/`: Frontend en **React + Vite + TypeScript + Tailwind CSS** con persistencia segura en LocalStorage, panel de control de estadísticas (Recharts) y modal de transacciones.

## 🛠️ Requisitos Previos

* Node.js >= 18.x
* pnpm >= 9.x

## 📦 Instalación

Para instalar todas las dependencias del monorepo:

```bash
pnpm install
```

## 💻 Ejecución en Desarrollo

Para iniciar tanto el backend como el frontend concurrentemente:

```bash
pnpm run dev
```

* **Frontend:** http://localhost:5173
* **Backend:** http://localhost:3001
* **Health Check:** http://localhost:3001/health

## 🧪 Pruebas Automatizadas

```bash
pnpm run test
```
