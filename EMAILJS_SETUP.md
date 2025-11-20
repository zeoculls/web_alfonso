# Configuración de EmailJS

Este documento explica cómo configurar EmailJS para que el formulario de contacto envíe emails reales.

## Pasos para configurar EmailJS

### 1. Crear una cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)

### 2. Configurar un servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. **Copia el Service ID** (lo necesitarás después)

### 3. Crear templates de email

Necesitas crear **DOS templates**: uno para la clínica y otro para el paciente (confirmación).

#### Template 1: Email a la Clínica
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Configura el template con los siguientes campos:
   - **To Email**: `{{to_email}}`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Reply To**: `{{reply_to}}`
   - **Subject**: `Nuevo contacto desde la web - {{service}}`
   - **Content**: 
   ```
   Has recibido un nuevo mensaje desde el formulario de contacto de la web:
   
   Nombre: {{from_name}}
   Email: {{from_email}}
   Teléfono: {{phone}}
   Servicio de interés: {{service}}
   
   Mensaje:
   {{message}}
   ```
4. Guarda el template
5. **Copia el Template ID** (ej: `template_wh36zrg`) - este es `TEMPLATE_ID_CLINICA`

#### Template 2: Email de Confirmación al Paciente
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Configura el template con los siguientes campos:
   - **To Email**: `{{to_email}}`
   - **From Name**: `Clínica Maldonado&Herrero`
   - **From Email**: (tu email de la clínica)
   - **Subject**: `Confirmación de recepción de su consulta`
   - **Content**: 
   ```
   Estimado/a {{to_name}},
   
   Hemos recibido su consulta sobre: {{service}}
   
   Nos pondremos en contacto con usted a la mayor brevedad posible.
   
   Si tiene alguna urgencia, puede contactarnos en:
   Teléfono: 91 146 59 14
   Email: {{clinic_email}}
   
   Atentamente,
   Clínica Maldonado&Herrero
   ```
4. Guarda el template
5. **Copia el Template ID** (ej: `template_xxxxxxx`) - este es `TEMPLATE_ID_PACIENTE`

### 4. Obtener tu Public Key
1. Ve a "Account" > "General"
2. **Copia tu Public Key** (User ID)

### 5. Configurar en el código
1. Abre el archivo `script.js`
2. Busca la sección `EMAILJS_CONFIG` al inicio del archivo
3. Reemplaza los valores:
   ```javascript
   const EMAILJS_CONFIG = {
       SERVICE_ID: 'tu_service_id_aqui',
       TEMPLATE_ID_CLINICA: 'tu_template_id_clinica_aqui',
       TEMPLATE_ID_PACIENTE: 'tu_template_id_paciente_aqui',
       PUBLIC_KEY: 'tu_public_key_aqui',
       TO_EMAIL: 'tu_email_clinica_aqui'
   };
   ```
   
   **Nota:** Si no quieres enviar email de confirmación al paciente todavía, deja `TEMPLATE_ID_PACIENTE` como `'YOUR_PATIENT_TEMPLATE_ID'` y solo se enviará el email a la clínica.

### 6. Probar el formulario
1. Abre la web en tu navegador
2. Completa el formulario de contacto
3. Envía un mensaje de prueba
4. Verifica que recibes el email

## Variables disponibles en los templates

### Template de Clínica:
- `{{from_name}}` - Nombre del usuario
- `{{from_email}}` - Email del usuario
- `{{phone}}` - Teléfono (o "No proporcionado" si está vacío)
- `{{service}}` - Servicio de interés seleccionado
- `{{message}}` - Mensaje del usuario (o "Sin mensaje adicional" si está vacío)
- `{{to_email}}` - Email de destino de la clínica
- `{{reply_to}}` - Email del usuario (para responder)

### Template de Paciente (Confirmación):
- `{{to_name}}` - Nombre del paciente
- `{{to_email}}` - Email del paciente
- `{{service}}` - Servicio de interés seleccionado
- `{{clinic_email}}` - Email de la clínica

## Solución de problemas

### El email no se envía
- Verifica que los IDs estén correctos en `EMAILJS_CONFIG`
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que el servicio de email esté conectado correctamente en EmailJS

### Error de CORS
- EmailJS maneja esto automáticamente, pero si hay problemas, verifica que estés usando la versión más reciente del SDK

### Límite de emails alcanzado
- El plan gratuito permite 200 emails/mes
- Considera actualizar a un plan de pago si necesitas más

