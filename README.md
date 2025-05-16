# accessibility-tests
# **Reporte de Pruebas de Accesibilidad – Grupo 21**

> **Sistema:** CCP Store  
> **Tecnología usada:** Playwright + Axe-core  
> **Repositorio base:** 
> **Semana:** 6  

---

## 🧭 Contexto y Alcance

El proyecto **CCP Store** busca garantizar no solo la funcionalidad, sino también la **accesibilidad** de su plataforma web, alineada con los principios de las **Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1**. En esta etapa, se integraron pruebas  con **Axe-core** para detectar barreras de accesibilidad en pantallas clave y flujos principales.

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
| **Sistema operativo**    | mac OS  | Desarrollo y pruebas locales |

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
| `seller-registration-accessibility.spec.ts` | Registro de vendedores | Operable, Robustez | ✅ Sin errores críticos |
| `report-view-accessibility.spec.ts` | Consulta de reportes | Entendible, Navegación con teclado | ⚠️ 1 advertencia leve (foco no visible en botón secundario) |

---

## 📊 Resultados y Métricas

| Métrica | Valor |
|--------|--------|
| **Total de pantallas auditadas** | 3 |
| **Errores críticos detectados** | 3 |
| **Advertencias menores** | 1 |
| **Tiempo estimado total** | 9 h 45 min |
| **Principio más afectado** | Perceptibilidad (bajo contraste y falta de etiquetas) |

---

## 💡 Recomendaciones

- ✅ **Agregar etiquetas `aria-label` o `aria-labelledby`** en campos no descriptivos.  
- 🎨 **Mejorar contraste de colores** en botones secundarios (especialmente grises sobre fondos blancos).  
- ⌨️ **Verificar orden de tabulación**, especialmente al incluir nuevos componentes modales o formularios.  
- 📣 **Incluir un resumen accesible de errores en formularios** para tecnologías de asistencia.

---

## 🚀 Próximos Pasos

- [ ] Integrar pruebas Axe a los flujos CI/CD con GitHub Actions.  
- [ ] Aumentar cobertura a pantallas móviles con emulación y tests responsivos.  
- [ ] Extender cobertura a formularios de login y carritos de compra.  
- [ ] Ejecutar validaciones manuales con lectores de pantalla (NVDA, VoiceOver).

---

*Documento elaborado por Grupo 21 – Semana 6*
