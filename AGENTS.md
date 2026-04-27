# 🤖 Pokedex Project Agent Rules

Este documento define las reglas de comportamiento, estándares técnicos y flujo de trabajo para el asistente de IA en el desarrollo de la Pokedex con Next.js.

---

## 🎯 Objetivo
Construir una Pokedex profesional utilizando **Next.js 15 (App Router)**, **TypeScript** y **Tailwind CSS**, consumiendo la **PokeAPI**.

---

## 🛠️ Stack Tecnológico & Estándares
* **Framework:** Next.js (App Router).
* **Lenguaje:** TypeScript (Tipado estricto, prohibido usar `any`).
* **Componentes:** * Priorizar **Server Components** para el fetching de datos.
    * Usar `"use client"` únicamente para interactividad (inputs, botones, estados locales).
* **Estilos:** Tailwind CSS (Diseño Mobile-First).
* **Imágenes:** Uso obligatorio de `next/image` para optimización.

---

## 🔌 Integración con MCP (Herramientas Externas)
El asistente tiene permiso y obligación de usar los servidores MCP disponibles:
1. **Context7:** Úsalo siempre para verificar la documentación más reciente de Next.js, Tailwind o PokeAPI antes de generar código complejo.
2. **n8n MCP:** Úsalo para disparar automatizaciones externas o pruebas de integración configuradas.
3. **GitHub MCP:** Para analizar la estructura del repositorio actual y mantener la coherencia.

---

## 📜 Reglas de Programación y Gestión
* **Fetching de Datos:** Centralizar las llamadas en un archivo `@/lib/pokeapi.ts`.
* **Arquitectura:**
    * `/app`: Rutas y páginas.
    * `/components`: Componentes UI reutilizables.
    * `/types`: Definición de interfaces de TypeScript.
    * `/lib`: Utilidades y clientes de API.
    * `/docs`: Documentación técnica del proyecto.
* **Documentación Obligatoria:** Toda funcionalidad, lógica compleja o decisión de arquitectura debe documentarse en archivos Markdown dentro de la carpeta `/docs`.
* **Control de Versiones:** Cada vez que se realice un cambio en el código, el asistente debe **aumentar la versión** en el archivo `package.json` (patch, minor o major según corresponda).
* **Registro de Cambios:** Todo cambio debe verse reflejado en el archivo `CHANGELOG.md` siguiendo estrictamente el estándar de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## 🔄 Flujo de Trabajo del Asistente
1. **Analizar antes de actuar:** Lee siempre los archivos existentes antes de proponer cambios.
2. **Explicación breve:** Antes de entregar código, explica el enfoque técnico.
3. **Manejo de Errores:** Incluir siempre estados de carga (`loading.tsx`) y límites de error (`error.tsx`).
4. **Ciclo de Cierre de Tarea (Obligatorio):**
    * Actualizar el código solicitado.
    * Incrementar la versión en `package.json`.
    * Registrar los cambios en `CHANGELOG.md`.
    * Crear/actualizar la documentación pertinente en `/docs`.
    * Validar que no existan errores de tipos o linting.

---

## 🎨 Guía Visual (Tailwind)
* **Colores por Tipo:** Implementar un mapa de colores (Fire: `bg-red-500`, Water: `bg-blue-500`, etc.).
* **Layout:** Grid responsivo (1 columna móvil, 3 tablet, 4+ desktop).