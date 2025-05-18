# accessibility-tests
# **Reporte Consolidado de Pruebas de Accesibilidad – Grupo 21**

> **Sistema:** CCP Store  
> **Tecnología usada:** Playwright + Axe-core  
> **Documento de prueba:**  [Pruebas de accesibilidad.pdf](https://github.com/user-attachments/files/20265813/Pruebas.de.accesibilidad.pdf)

> **Semana:** 6  

---

## 🧭 Contexto y Alcance

El proyecto **CCP Store** busca garantizar no solo la funcionalidad, sino también la **accesibilidad** de su plataforma web, alineada con los principios de las **Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1**. En esta etapa, se integraron pruebas automatizadas con **Axe-core** para detectar barreras de accesibilidad en pantallas clave y flujos principales.

### ✅ Flujos evaluados

- Registro de **fabricantes**
- Registro de **vendedores**
- Consulta de **reportes administrativos**

---

## 🎯 Objetivo de la Prueba de Accesibilidad

| Criterio     | Descripción |
|--------------|-------------|
| **Específico** | Identificar problemas de accesibilidad en pantallas clave validando principios de **operabilidad**, **entendibilidad** y **robustez**, conforme a la norma WCAG 2.1. |
| **Medible**    | Generación de reportes automáticos de accesibilidad usando **Axe-core**. |
| **Alcanzable** | Pruebas desarrolladas y ejecutadas en un tiempo total de **10 horas**. |
| **Relevante**  | Priorización del acceso equitativo a la plataforma para usuarios con diferentes condiciones y tecnologías de asistencia. |

---

## 🛠️ Entorno y Herramientas

| Herramienta              | Versión     | Propósito |
|--------------------------|-------------|-----------|
| **Playwright**           | 1.52.0      | Navegación e interacción con la UI |
| **axe-core/playwright**  | 4.8.2       | Motor de pruebas de accesibilidad WCAG |
| **Node.js**              | 22.15.17    | Entorno de ejecución |
| **Browsers**             | Chromium    | Evaluación web multiplataforma |
| **Sistema operativo**    | macOS       | Desarrollo y pruebas locales |

---

## 🔍 Metodología de Pruebas

1. **Selección de rutas críticas**: Se identificaron pantallas clave con alto tráfico o relevancia operativa.
2. **Integración de Axe**: Se usó el paquete `axe-core/playwright` para inyectar Axe en el navegador y generar reportes automáticos.
3. **Criterios evaluados**:  
   - Contraste de colores  
   - Etiquetas de formularios  
   - Orden de tabulación  
   - Roles ARIA válidos  
   - Navegación con teclado  
4. **Automatización por flujo**: Las pruebas se integraron a scripts Playwright ya existentes, reutilizando login y navegación.

---

## 🧪 Diseño de Casos de Accesibilidad

| **Spec** | **Pantalla evaluada** | **Principios WCAG evaluados** | **Resultado** |
|---------|------------------------|-------------------------------|----------------|
| `manufacturer-registration-accessibility.spec.ts` | Registro de fabricantes | Perceptible, Operable, Entendible | ⚠️ 3 errores (labels faltantes, bajo contraste) |
| `seller-registration-accessibility.spec.ts` | Registro de vendedores | Operable, Robustez | ⚠️ 2 errores (landmark duplicado, botón sin nombre accesible) |
| `report-view-accessibility.spec.ts` | Consulta de reportes | Entendible, Navegación con teclado | ⚠️ 1 advertencia leve (foco no visible en botón secundario) |

---

## 📊 Resultados y Métricas

| Métrica | Valor |
|--------|--------|
| **Total de pantallas auditadas** | 3 |
| **Errores críticos detectados** | 6 |
| **Advertencias menores** | 2 |
| **Tiempo estimado total** | 9 h 45 min |
| **Principios más afectados** | Perceptibilidad y Estructura Semántica |

---

## 🧠 Consolidado de Violaciones Comunes

| Violación             | Recomendación QA                                                                                     | Prioridad |
|-----------------------|-------------------------------------------------------------------------------------------------------|-----------|
| `region`              | Encapsular contenido en landmarks semánticos como `<main>`, `<section>`, `<nav>`, `<header>`, etc.    | Alta      |
| `landmark-one-main`   | Mantener una sola etiqueta `<main>` por página para estructurar correctamente el contenido principal. | Alta      |
| `color-contrast`      | Asegurar un contraste mínimo de 4.5:1 entre texto y fondo, especialmente en botones secundarios.       | Alta      |
| `label`               | Asociar etiquetas descriptivas a todos los campos de entrada usando `<label>` o atributos ARIA.        | Alta      |
| `button-name`         | Agregar texto visible o atributos `aria-label` a todos los botones sin nombre accesible.              | Media     |
| `image-alt`           | Añadir descripciones en el atributo `alt` para todas las imágenes que transmiten información.         | Media     |
| `html-has-lang`       | Definir el atributo `lang="es"` o `lang="en"` en la etiqueta `<html>`.                                | Media     |

---

## 💡 Recomendaciones

- ✅ **Estructura semántica:** Usar landmarks HTML5 de forma adecuada (`<main>`, `<nav>`, `<header>`).  
- 🎨 **Contraste de colores:** Corregir el color de texto y fondos en botones para asegurar visibilidad.  
- 🏷️ **Etiquetas accesibles:** Implementar `label`, `aria-label` o `aria-labelledby` en inputs y botones.  
- ⌨️ **Orden de tabulación lógico:** Validar la navegación secuencial por teclado en modales y formularios.  
- 📸 **Imágenes informativas:** Incluir textos alternativos en elementos `<img>`.  
- 🌐 **Idioma del contenido:** Establecer el atributo `lang` en el HTML para lectores de pantalla.  

---

## 🚀 Próximos Pasos

- [ ] Corregir violaciones priorizadas en los flujos evaluados.   
- [ ] Establecer pruebas de accesibilidad como parte del pipeline de CI/CD.

---

> *Documento elaborado por Grupo 21 – Semana 6.*

