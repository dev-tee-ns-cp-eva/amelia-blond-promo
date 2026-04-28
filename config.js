// ========================================
// 📱 CONFIGURAÇÃO CENTRAL DO TELEGRAM
// ========================================
// 🔥 MUDE O LINK ABAIXO PARA O QUE VOCÊ QUISER 🔥
// O site inteiro vai usar este link automaticamente!
// ========================================

const TELEGRAM_CONFIG = {
    // ⭐ MUDE AQUI O SEU LINK DO TELEGRAM ⭐
    link: 'https://t.me/promo_folder13',
    
    // Se quiser usar @menção, use assim:
    // link: '@seu_usuario',
    
    // Versão para exibir (opcional)
    displayLink: 'https://t.me/promo_folder13'
};

// Não precisa mudar nada abaixo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TELEGRAM_CONFIG;
}

console.log('✅ Configuração do Telegram carregada:', TELEGRAM_CONFIG.link);
