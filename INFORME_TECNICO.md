# INFORME TÉCNICO DE ARQUITECTURA Y DESARROLLO

## Plataforma de Apuestas Deportivas y Pasarela de Pagos SnailPay

---

### 1. Resumen del Proceso Seguido para el Desarrollo de la Prueba

El desarrollo de la plataforma se ejecutó mediante una metodología estructurada e incremental, dividida en cinco fases principales orientadas a garantizar la calidad, consistencia y robustez del software:

1. **Fase de Análisis y Definición de Contratos:** Se analizaron los requerimientos técnicos y funcionales de la plataforma de apuestas y la pasarela de pagos simulada. Se diseñó una arquitectura de monorepo con un paquete compartido (`@app/shared`) donde se formalizaron los esquemas de validación de datos y las interfaces TypeScript comunes para cliente y servidor.
2. **Fase de Backend y Simulación de Pasarela (SnailPay Gateway):** Se implementó una API REST modular en Node.js y Express con TypeScript. Se estructuró la lógica de procesamiento de pagos emulando el comportamiento de una pasarela real, incluyendo validación de parámetros, verificación de tarjetas autorizadas, validación dinámica de fechas de expiración, validación de códigos de seguridad (CVV), manejo de errores de servidor simulados y persistencia en memoria de transacciones y saldos.
3. **Fase de Frontend y Dashboard Analítico:** Se construyó una aplicación web de una sola página (SPA) en React con TypeScript y Vite. Se desarrolló una interfaz temática oscura inspirada en plataformas profesionales de apuestas deportivas, libre de elementos informales o emoticones. Se implementaron el widget de saldo, cuatro tarjetas de indicadores clave de rendimiento (KPIs), dos gráficos interactivos con Recharts (distribución de 42 apuestas y rendimiento de los 6 caracoles) y cinco modales con tablas detalladas y filtros de desglose analítico.
4. **Fase de Autenticación y Persistencia Local:** Se integró un mecanismo de autenticación en el cliente utilizando criptografía nativa del navegador (Web Crypto API) para el almacenamiento de credenciales con función hash SHA-256 y salting aleatorio. Se garantizó la persistencia del estado de la sesión, historial de transacciones y balance en el almacenamiento local del navegador (`localStorage`).
5. **Fase de Pruebas, Despliegue y Documentación:** Se escribió y ejecutó una suite de pruebas automatizadas unitarias y de integración. Posteriormente, se realizó el despliegue en la nube del frontend en Netlify y del backend en Vercel, y se elaboró la propuesta de arquitectura de base de datos relacional para entornos de alta concurrencia.

---

### 2. Decisiones Principales de Arquitectura y Tecnología, con su Justificación

#### 2.1. Arquitectura de Monorepo con pnpm Workspaces
* **Decisión:** Organizar el proyecto en tres paquetes aislados pero interconectados (`client`, `server`, `shared`) gestionados mediante pnpm Workspaces.
* **Justificación:** Centraliza la gobernanza del código y permite compartir esquemas de validación y tipos estáticos sin duplicación de definiciones, asegurando que cualquier cambio en la estructura de datos se refleje de manera inmediata en ambos extremos de la aplicación.

#### 2.2. Frontend: React, Vite, Tailwind CSS y Recharts
* **Decisión:** Utilizar React 18 con Vite como empaquetador, Tailwind CSS para el sistema de diseño visual, Recharts para la visualización de datos y Lucide React para iconografía vectorial.
* **Justificación:** Vite proporciona compilación optimizada y recarga en caliente de alto rendimiento. Tailwind CSS permite construir una interfaz visual sobria, moderna y responsiva sin sobrecarga de estilos en cascada desordenados. Recharts ofrece gráficos declarativos fluidos y configurables para métricas financieras y deportivas. Lucide React asegura una apariencia corporativa limpia sin el uso de emojis.

#### 2.3. Backend: Node.js, Express y TypeScript
* **Decisión:** Implementar la pasarela SnailPay con Express en TypeScript, siguiendo un patrón arquitectónico en capas (Rutas -> Controladores -> Servicios -> Esquemas de Validación).
* **Justificación:** Express ofrece una estructura ligera y predecible para microservicios y APIs REST. La tipificación estricta en TypeScript mitiga errores en tiempo de ejecución y documenta los contratos de entrada y salida de forma nativa.

#### 2.4. Validación Unificada en Tiempo de Ejecución con Zod
* **Decisión:** Utilizar Zod como motor de validación tanto en el backend como en el frontend.
* **Justificación:** Zod permite inferir tipos TypeScript directamente de los esquemas declarados, garantizando validación rigurosa de tipos, formatos numéricos, longitudes de cadenas y fechas antes de procesar cualquier transacción financiera.

#### 2.5. Seguridad Criptográfica en Cliente (Web Crypto API)
* **Decisión:** Implementar el cifrado de credenciales de acceso predeterminadas mediante la API nativa `crypto.subtle` del navegador, utilizando funciones de resumen criptográfico SHA-256 con adición de sal (*salt*).
* **Justificación:** Evita el almacenamiento de credenciales en texto plano en el código o en `localStorage`, garantizando que la validación de acceso respete estándares mínimos de seguridad criptográfica sin añadir dependencias externas pesadas.

---

### 3. Herramientas, Librerías y Plantillas Utilizadas

* **Entorno y Gestión de Paquetes:** Node.js v20+, TypeScript v5.3+, pnpm v9 (gestor de dependencias y workspaces).
* **Librerías de Frontend:**
  * `react` y `react-dom` (v18.2): Biblioteca principal para construcción de interfaces.
  * `vite` (v5.1): Herramienta de compilación y servidor de desarrollo.
  * `tailwindcss` (v3.4), `postcss` y `autoprefixer`: Framework de estilos utilitarios y procesamiento CSS.
  * `recharts` (v2.12): Biblioteca de renderizado de gráficos vectoriales (Donut y Bar charts).
  * `lucide-react` (v0.344): Sistema de iconos vectoriales estándar.
  * `clsx` y `tailwind-merge`: Utilidades para composición condicional de clases CSS.
* **Librerías de Backend:**
  * `express` (v4.18): Framework HTTP para la API REST.
  * `cors` (v2.8): Manejo de políticas de intercambio de recursos de origen cruzado.
  * `dotenv` (v16.4): Gestión de variables de entorno.
  * `ts-node-dev`: Entorno de ejecución en desarrollo para TypeScript.
* **Librerías Compartidas y Validación:**
  * `zod` (v3.22): Esquemas de validación y tipado en tiempo de ejecución.
* **Herramientas de Pruebas:**
  * `vitest` (v1.3): Motor de pruebas unitarias e integración de alta velocidad compatible con Vite.
  * `@testing-library/react` y `@testing-library/jest-dom`: Utilidades para aserciones de renderizado en React.
* **Infraestructura y Control de Versiones:**
  * Git y GitHub: Control de versiones y repositorio público.
  * Netlify: Plataforma de alojamiento y despliegue continuo (CI/CD) para el cliente web.
  * Vercel: Plataforma de funciones sin servidor (Serverless) para la API de Express.
  * Postman: Entorno de pruebas y validación manual de endpoints REST.
* **Plantillas:** No se utilizaron plantillas comerciales ni temas prefabricados. El proyecto fue estructurado y codificado desde cero.

---

### 4. Uso de Inteligencia Artificial

* **Herramientas Empleadas:** Modelos avanzados de asistencia en ingeniería de software y programación en pares.
* **Tareas Específicas en las que se Utilizó:**
  * Generación y ajuste de la configuración base del monorepo (`pnpm-workspace.yaml`, configuraciones de compilación cruzada en `tsconfig.json`).
  * Estructuración inicial de esquemas de validación Zod y definición de interfaces TypeScript compartidas.
  * Asistencia en el diseño matemático y estadístico del conjunto de datos del historial (balance de 42 apuestas: 24 ganadas y 18 perdidas, y rendimiento de los 6 caracoles sumando 6 carreras del día).
  * Soporte en la elaboración de reglas de redirección para entornos Serverless y SPAs (`_redirects` en Netlify y `vercel.json` en Vercel).
* **Validación de Resultados Generados por la IA:**
  * **Revisión y Refactorización Manual:** Cada línea de código propuesta fue inspeccionada, adaptada y depurada manualmente para garantizar que se ajustara a los requerimientos específicos.
  * **Verificación con Pruebas Automatizadas:** Se ejecutaron suites de pruebas unitarias para corroborar que la lógica de negocio y las validaciones de Zod funcionaran de forma determinista.
  * **Auditoría de Cumplimiento:** Se auditaron todos los componentes visuales y textos de la plataforma para verificar la ausencia total de emojis, nombres de la empresa evaluadora y tecnicismos inapropiados para usuarios finales.

---

### 5. Pruebas Implementadas

#### 5.1. Lo que se Probó
* **Validación de Esquemas (`@app/shared`):**
  * Validación de cargas útiles correctas para pagos con SnailPay.
  * Rechazo de montos numéricos menores o iguales a cero.
  * Validación de formato de tarjetas (16 dígitos numéricos) y CVV (3 o 4 dígitos).
  * Validación de formato de fecha de expiración (`MM/YY` y `MM/YYYY`).
  * Validación de estructura de objetos de transacción y respuestas de servicio.
* **Lógica del Servicio SnailPay (`server`):**
  * Aprobación exitosa con la tarjeta de pruebas designada (`1234123412341234`, `12/26`, `543`).
  * Rechazo por código de seguridad inválido (`card_declined:invalid_cvv`).
  * Rechazo por tarjeta vencida mediante validación dinámica contra el mes y año actual (`card_declined:expired_card`).
  * Simulación controlada de error interno del servidor (código HTTP 500) ante tarjetas finalizadas en `9999`.
  * Consulta correcta de saldo disponible y registro acumulativo de transacciones.
* **Frontend e Interfaz de Usuario (`client`):**
  * Renderizado del panel principal y montaje de componentes de control.
  * Persistencia e hidratación del balance e historial desde `localStorage`.
  * Flujo de recarga de saldo mediante formulario modal y actualización reactiva de la interfaz.
  * Despliegue interactivo de los cinco modales de desglose analítico.

#### 5.2. Lo que No se Probó y Justificación
* **Pruebas de Carga y Concurrencia Masiva:** No se realizaron pruebas de estrés distribuido dado que el alcance de la prueba especificaba un backend con persistencia en memoria y un cliente con persistencia local.
* **Pruebas End-to-End Automatizadas (Cypress/Playwright):** Se priorizó una cobertura sólida de pruebas unitarias e integración en lógica crítica y contratos, sustituyendo las pruebas E2E automatizadas por una exhaustiva verificación manual interactiva en navegadores modernos y Postman para optimizar los tiempos de desarrollo.

---

### 6. Lista de Funcionalidades Terminadas

La implementación cubre el 100% de los requerimientos funcionales y técnicos exigidos:

1. **Módulo de Autenticación de Usuarios:**
   * Inicio de sesión con credenciales preconfiguradas.
   * Cifrado con función hash SHA-256 y salting mediante Web Crypto API.
   * Persistencia de sesión en el almacenamiento local y cierre de sesión seguro.
2. **Dashboard de Apuestas Deportivas (Temática Caracoles):**
   * Visualización del saldo actual de la cuenta y botón de recarga directa.
   * Cuatro tarjetas de indicadores clave: Total Apostado, Apuestas Ganadas, Tasa de Victoria y Retorno sobre Inversión (ROI).
   * Gráfico Donut interactivo con la distribución exacta de 42 apuestas (24 ganadas y 18 perdidas).
   * Gráfico de Barras con el desempeño individual de los 6 caracoles en las 6 carreras del día.
3. **Módulos de Detalle y Desglose Analítico (5 Modales):**
   * Modal de Detalle de Billetera y Transacciones (historial completo de depósitos y débitos con filtros por tipo).
   * Modal de Detalle de Apuestas Totales (desglose de las 42 apuestas con estado, cuota y ganancia).
   * Modal de Análisis de Efectividad (desglose de tasa de éxito y comparación de apuestas ganadas vs. perdidas).
   * Modal de Rendimiento Financiero y ROI (análisis de balance neto y porcentaje de retorno).
   * Modal de Desglose de Carreras de Caracoles (historial de carreras, posiciones, distancias y tiempos de pista).
4. **Pasarela de Pagos SnailPay (Mock API):**
   * Endpoint `POST /api/snailpay/charge` para procesamiento de pagos.
   * Aprobación determinista con tarjeta de prueba autorizada.
   * Rechazos específicos por CVV incorrecto y tarjeta expirada.
   * Simulación de error de pasarela (HTTP 500) con tarjeta terminada en `9999`.
   * Endpoints auxiliares `GET /api/snailpay/balance` y `GET /api/snailpay/transactions`.
5. **Formulario de Recarga de Saldo Integrado:**
   * Modal de recarga con selector de montos rápidos y campo de monto personalizado.
   * Captura y validación de datos de tarjeta de crédito (número, expiración y CVV).
   * Estados visuales claros de procesamiento, éxito de transacción o mensaje de rechazo.
   * Actualización instantánea del saldo en la interfaz y registro en el almacenamiento local.
6. **Diseño Visual e Identidad Corporativa:**
   * Tema oscuro sobrio y responsivo adaptado a dispositivos móviles y de escritorio.
   * Cero uso de emoticones en toda la plataforma (utilización exclusiva de iconos SVG profesionales).
   * Cero términos o jerga de desarrollo en la interfaz de usuario.

---

### 7. Lista de Funcionalidades No Terminadas o Problemas Conocidos

* **Funcionalidades Incompletas:** Ninguna. Se desarrollaron e integraron todas las funcionalidades requeridas.
* **Problemas Conocidos / Consideraciones:**
  * La persistencia de datos en el backend actual opera en memoria del proceso de Node.js (se reinicia al reiniciar el servidor), lo cual cumple estrictamente con el requerimiento de prueba técnica. Para un entorno productivo de misión crítica, la persistencia debe delegarse a una base de datos relacional conforme a la propuesta del Adicional 2.
  * La inclusión del número de tarjeta y CVV en la respuesta del backend y su almacenamiento en `localStorage` se implementó siguiendo estrictamente la Sección 2.4 de las especificaciones de la prueba técnica; en una pasarela en producción real sujeta a normativas PCI-DSS, dichos datos sensibles nunca deben ser devueltos ni almacenados por el cliente, empleándose en su lugar mecanismos de tokenización segura.

---

### 8. Tiempo Aproximado Invertido

* **Análisis de requerimientos, diseño conceptual y arquitectura:** 1.5 horas.
* **Configuración del monorepo, contratos compartidos y esquemas Zod:** 1.5 horas.
* **Desarrollo del Backend, servicio SnailPay y pruebas unitarias:** 3.5 horas.
* **Desarrollo del Frontend (Dashboard, gráficas, 5 modales y formulario de pago):** 5.5 horas.
* **Mecanismo de autenticación con Web Crypto API y persistencia en LocalStorage:** 1.5 horas.
* **Pruebas de integración, verificación con Postman y ajustes visuales:** 1.5 horas.
* **Despliegue en la nube (Netlify + Vercel) y configuración de CI/CD:** 1.5 horas.
* **Diseño del modelo relacional de base de datos y documentación técnica:** 1.5 horas.
* **Tiempo Total Invertido:** 18.0 horas.

---

### 9. Liga al Repositorio Público y Enlaces del Proyecto

* **Repositorio en GitHub:** `https://github.com/Ignaci05/ignacio-0506.git`
* **Rama Principal:** `master`

---

### Adicional 1: Despliegue en la Nube (Producción)

Se implementó una arquitectura de despliegue continuo en la nube para disponibilizar la solución de forma pública y totalmente funcional:

* **Aplicación Web Frontend (Netlify):**
  * URL Pública: `https://ignacio-0506.netlify.app/`
  * Configuración: Despliegue automático de SPA conectado a la rama principal de GitHub, con resolución de rutas de cliente mediante reglas de reescritura en `netlify.toml` y compasión optimizada de assets estáticos.
* **API Backend SnailPay (Vercel):**
  * URL Pública de la API: `https://ignacio-0506.vercel.app/api`
  * Configuración: Despliegue en arquitectura Serverless Functions utilizando el adaptador de Express sobre la API de ejecución Vercel Build Output v3, configurado con encabezados CORS permisivos para comunicación segura con el frontend.

---

### Adicional 2: Propuesta de Diseño de Base de Datos Relacional

Para evolucionar la plataforma hacia un entorno de producción de alta concurrencia, tolerancia a fallos y consistencia transaccional estricta, se propone un modelo relacional en **PostgreSQL**.

#### 1. Modelo Entidad-Relación y Estructura de Tablas

##### A. Tabla `users` (Usuarios y Autenticación)
* `id` (UUID, Llave Primaria): Identificador único del usuario.
* `email` (VARCHAR(255), Único, No Nulo): Correo electrónico del usuario.
* `password_hash` (VARCHAR(255), No Nulo): Hash criptográfico de la contraseña (bcrypt/Argon2).
* `password_salt` (VARCHAR(64), No Nulo): Sal criptográfica utilizada en el hash.
* `full_name` (VARCHAR(150), No Nulo): Nombre completo del usuario.
* `status` (VARCHAR(20), No Nulo): Estado de la cuenta (`active`, `suspended`, `pending_verification`).
* `created_at` (TIMESTAMPTZ, Default NOW()): Fecha y hora de registro.
* `updated_at` (TIMESTAMPTZ, Default NOW()): Fecha y hora de última modificación.

##### B. Tabla `wallets` (Billeteras Financieras)
* `id` (UUID, Llave Primaria): Identificador único de la billetera.
* `user_id` (UUID, Llave Foránea a `users.id`, Único, No Nulo): Relación 1 a 1 con el usuario.
* `currency` (VARCHAR(3), Default 'MXN', No Nulo): Código de moneda ISO 4217.
* `balance` (DECIMAL(14, 2), Default 0.00, No Nulo, Check: `balance >= 0`): Saldo disponible.
* `locked_balance` (DECIMAL(14, 2), Default 0.00, No Nulo, Check: `locked_balance >= 0`): Saldo retenido en apuestas activas.
* `version` (INTEGER, Default 1, No Nulo): Control de concurrencia optimista.
* `updated_at` (TIMESTAMPTZ, Default NOW()): Fecha y hora de actualización.

##### C. Tabla `payment_transactions` (Transacciones de Pasarela)
* `id` (UUID, Llave Primaria): Identificador interno de la transacción.
* `wallet_id` (UUID, Llave Foránea a `wallets.id`, No Nulo): Billetera asociada.
* `gateway_transaction_id` (VARCHAR(100), Único, No Nulo): Identificador devuelto por SnailPay (`id`).
* `authorization_code` (VARCHAR(50), Nulo): Código de autorización emitido por la pasarela.
* `reference` (VARCHAR(50), No Nulo): Referencia interna de la operación.
* `transaction_type` (VARCHAR(20), No Nulo): Tipo de movimiento (`deposit`, `withdrawal`, `chargeback`).
* `amount` (DECIMAL(14, 2), No Nulo, Check: `amount > 0`): Monto de la transacción.
* `status` (VARCHAR(20), No Nulo): Estado (`approved`, `rejected`, `pending`, `failed`).
* `status_detail` (VARCHAR(100), No Nulo): Detalle devuelto por la pasarela.
* `payment_method` (VARCHAR(30), Default 'credit_card', No Nulo): Método de pago utilizado.
* `card_last_four` (VARCHAR(4), Nulo): Últimos 4 dígitos de la tarjeta para fines de auditoría.
* `created_at` (TIMESTAMPTZ, Default NOW()): Fecha y hora de la transacción.

##### D. Tabla `snails` (Catálogo de Caracoles)
* `id` (UUID, Llave Primaria): Identificador único del caracol.
* `name` (VARCHAR(100), Único, No Nulo): Nombre del caracol competidor.
* `color` (VARCHAR(20), No Nulo): Código de color distintivo para visualización.
* `total_races` (INTEGER, Default 0, No Nulo): Total de carreras disputadas.
* `total_wins` (INTEGER, Default 0, No Nulo): Total de victorias de primer lugar.
* `created_at` (TIMESTAMPTZ, Default NOW()): Fecha de alta en el catálogo.

##### E. Tabla `races` (Eventos de Carreras)
* `id` (UUID, Llave Primaria): Identificador único del evento de carrera.
* `race_number` (INTEGER, No Nulo): Número secuencial de carrera del día.
* `scheduled_at` (TIMESTAMPTZ, No Nulo): Fecha y hora programada de inicio.
* `status` (VARCHAR(20), No Nulo): Estado (`scheduled`, `open_for_bets`, `running`, `finished`, `cancelled`).
* `winner_snail_id` (UUID, Llave Foránea a `snails.id`, Nulo): Caracol ganador al finalizar la carrera.
* `created_at` (TIMESTAMPTZ, Default NOW()): Fecha de creación.

##### F. Tabla `race_participants` (Participantes y Momios por Carrera)
* `id` (UUID, Llave Primaria): Identificador del registro.
* `race_id` (UUID, Llave Foránea a `races.id`, No Nulo): Carrera asociada.
* `snail_id` (UUID, Llave Foránea a `snails.id`, No Nulo): Caracol participante.
* `lane_number` (INTEGER, No Nulo): Carril asignado (1 a 6).
* `odds` (DECIMAL(6, 2), No Nulo, Check: `odds >= 1.01`): Cuota o momio asignado al caracol para esa carrera.
* `final_position` (INTEGER, Nulo): Posición oficial obtenida al finalizar la carrera (1 a 6).
* `finish_time_seconds` (DECIMAL(6, 2), Nulo): Tiempo registrado en pista.
* **Restricción de Unicidad:** `UNIQUE (race_id, snail_id)` y `UNIQUE (race_id, lane_number)`.

##### G. Tabla `bets` (Registro de Apuestas)
* `id` (UUID, Llave Primaria): Identificador único del boleto de apuesta.
* `user_id` (UUID, Llave Foránea a `users.id`, No Nulo): Usuario que realizó la apuesta.
* `race_participant_id` (UUID, Llave Foránea a `race_participants.id`, No Nulo): Participante seleccionado.
* `amount` (DECIMAL(14, 2), No Nulo, Check: `amount > 0`): Monto arriesgado en la apuesta.
* `odds_at_placement` (DECIMAL(6, 2), No Nulo): Momio congelado al momento de colocar la apuesta.
* `potential_payout` (DECIMAL(14, 2), No Nulo): Monto potencial a cobrar (`amount * odds_at_placement`).
* `status` (VARCHAR(20), Default 'placed', No Nulo): Estado (`placed`, `won`, `lost`, `refunded`).
* `actual_payout` (DECIMAL(14, 2), Default 0.00, No Nulo): Ganancia neta efectivamente acreditada.
* `placed_at` (TIMESTAMPTZ, Default NOW()): Fecha y hora de colocación.
* `settled_at` (TIMESTAMPTZ, Nulo): Fecha y hora de liquidación tras la carrera.

##### H. Tabla `audit_logs` (Trazabilidad y Auditoría)
* `id` (BIGSERIAL, Llave Primaria): Identificador secuencial de evento.
* `user_id` (UUID, Nulo): Usuario que originó la acción.
* `action` (VARCHAR(50), No Nulo): Acción ejecutada (`deposit_approved`, `bet_placed`, `race_settled`, `payout_credited`).
* `entity_type` (VARCHAR(30), No Nulo): Entidad afectada (`wallet`, `bet`, `payment_transaction`).
* `entity_id` (UUID, No Nulo): Identificador de la entidad afectada.
* `metadata` (JSONB, Nulo): Contexto detallado y datos del cambio en formato JSON.
* `ip_address` (VARCHAR(45), Nulo): Dirección IP del cliente.
* `created_at` (TIMESTAMPTZ, Default NOW()): Marca de tiempo inmutable.

---

#### 2. Estrategia de Índices para Rendimiento
* `CREATE INDEX idx_users_email ON users(email);`
* `CREATE INDEX idx_wallets_user_id ON wallets(user_id);`
* `CREATE INDEX idx_transactions_wallet_id ON payment_transactions(wallet_id);`
* `CREATE INDEX idx_transactions_gateway_id ON payment_transactions(gateway_transaction_id);`
* `CREATE INDEX idx_bets_user_id ON bets(user_id);`
* `CREATE INDEX idx_bets_race_participant ON bets(race_participant_id);`
* `CREATE INDEX idx_bets_status ON bets(status);`
* `CREATE INDEX idx_races_status_scheduled ON races(status, scheduled_at);`
* `CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);`

---

#### 3. Control de Concurrencia e Integridad Transaccional ACID

Para prevenir problemas de doble gasto (*double spending*) y condiciones de carrera (*race conditions*) durante depósitos, colocación de apuestas y cobro de premios, la base de datos implementa las siguientes garantías:

1. **Aislamiento Transaccional y Bloqueo Pesimista en Billeteras:**
   * Al procesar una apuesta o una recarga, la consulta a la billetera se ejecuta dentro de un bloque transaccional utilizando bloqueo a nivel de fila (`SELECT balance, locked_balance FROM wallets WHERE user_id = $1 FOR UPDATE;`).
   * Esto garantiza que ninguna otra transacción concurrente pueda leer ni modificar el saldo del usuario hasta que la transacción en curso concluya con `COMMIT` o `ROLLBACK`.
2. **Restricciones de Integridad a Nivel de Motor (Check Constraints):**
   * Las columnas de saldo cuentan con restricciones `CHECK (balance >= 0)` y `CHECK (locked_balance >= 0)`. Incluso ante cualquier eventual fallo de lógica en la capa de aplicación, el motor de base de datos impedirá físicamente que un balance resulte negativo.
3. **Liquidación Atómica de Carreras:**
   * Al finalizar una carrera, el cálculo de resultados y el abono masivo de ganancias a los usuarios ganadores se ejecuta en una única transacción atómica. Si ocurre un fallo en la acreditación de una sola apuesta, toda la liquidación revierte de forma automática, garantizando la consistencia global del sistema.
