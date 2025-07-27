# 📧 Configuração do EmailJS - Guia Completo

## 🚀 Como Configurar o Sistema de Emails

### 1. **Criar Conta no EmailJS**
1. Acesse [emailjs.com](https://emailjs.com) e crie sua conta
2. Faça login no dashboard

### 2. **Configurar Serviço de Email**
1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor (Gmail, Outlook, Yahoo, etc.)
4. **Para Gmail:**
   - Entre com sua conta Google
   - Autorize o EmailJS
   - Anote o **Service ID** gerado

### 3. **Criar Template de Email**
1. Clique em **"Email Templates"**
2. Clique em **"Create New Template"**
3. **Cole o código do template** que está no arquivo `emailjs-template-simple.html`
4. **Configure as variáveis:**
   - `{{from_name}}` - Nome do remetente
   - `{{from_email}}` - Email do remetente
   - `{{subject}}` - Assunto da mensagem
   - `{{message}}` - Corpo da mensagem
   - `{{time}}` - Data/hora do envio
   - `{{reply_to}}` - Email para resposta
   - `{{to_name}}` - Seu nome (Jeferson Reis)

5. **Configurar o destinatário:**
   - No campo "To Email", coloque: `seu-email@gmail.com`
   - No campo "From Name", coloque: `{{from_name}}`
   - No campo "From Email", coloque: `{{from_email}}`
   - No campo "Subject", coloque: `[PORTFÓLIO] {{subject}}`

6. Salve o template e anote o **Template ID**

### 4. **Obter Public Key**
1. Vá em **"Account"** > **"General"**
2. Anote sua **Public Key**

### 5. **Configurar Variáveis de Ambiente**
Crie o arquivo `.env.local` na raiz do projeto com:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

**⚠️ Substitua pelos seus valores reais!**

### 6. **Personalizar o Template**

#### Campos Disponíveis:
- `{{from_name}}` - Nome de quem envia
- `{{from_email}}` - Email de quem envia  
- `{{subject}}` - Assunto da mensagem
- `{{message}}` - Texto da mensagem
- `{{time}}` - Data/hora automaticamente formatada
- `{{reply_to}}` - Email para resposta
- `{{to_name}}` - Seu nome (Jeferson Reis)

#### Exemplo de Template Personalizado:
```html
<!-- Use o código do arquivo emailjs-template-simple.html -->
```

### 7. **Personalizar Links de Ação**

No template, você pode personalizar os links:

```html
<!-- Botão Email -->
<a href="mailto:{{from_email}}?subject=Re: {{subject}}">
    ✉️ Responder por Email
</a>

<!-- Botão WhatsApp (substitua o número) -->
<a href="https://wa.me/5511999999999?text=Olá {{from_name}}, recebi sua mensagem sobre: {{subject}}">
    📱 WhatsApp
</a>
```

**⚠️ Atualize o número do WhatsApp no template!**

### 8. **Testar o Sistema**

1. **Inicie o projeto:**
   ```bash
   npm run dev
   ```

2. **Acesse o formulário de contato**

3. **Preencha e envie uma mensagem teste**

4. **Verifique seu email** - deve chegar com o design bonito!

### 9. **Recursos do Template Criado**

✅ **Design Moderno e Responsivo**
✅ **Gradientes azul/roxo (tema do portfólio)**
✅ **Informações organizadas em cards**
✅ **Botões de ação (Email e WhatsApp)**
✅ **Avatar com emoji**
✅ **Data/hora automaticamente formatada**
✅ **Footer com informações profissionais**
✅ **Compatível com todos os clientes de email**

### 10. **Troubleshooting**

#### ❌ **Email não chega:**
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o serviço EmailJS está ativo
- Verifique a pasta de spam

#### ❌ **Erro 403/Unauthorized:**
- Verifique a Public Key
- Confirme se o domínio está autorizado no EmailJS

#### ❌ **Template não funciona:**
- Verifique se todas as variáveis `{{}}` estão corretas
- Confirme se o Template ID está certo

### 11. **Exemplo de Email Recebido**

Quando alguém enviar uma mensagem, você receberá um email assim:

```
💼 Nova Mensagem de Contato
Portfólio Jeferson Reis - Full Stack Developer

João Silva enviou uma nova mensagem através do seu portfólio.

👤 João Silva
📧 joao@email.com  
📅 25 de janeiro de 2025 às 14:30

Assunto: Orçamento para site

Mensagem:
Olá Jeferson! Gostaria de solicitar um orçamento 
para desenvolvimento de um site para minha empresa...

[Botão: ✉️ Responder por Email] [Botão: 📱 WhatsApp]
```

## ✅ **Status: Template EmailJS Profissional Criado!**

O sistema está **100% pronto** - só precisa configurar as credenciais e você começará a receber emails lindos e profissionais! 🎉