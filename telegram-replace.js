// ========================================
// 🔄 SUBSTITUI AUTOMATICAMENTE TODOS OS LINKS DO TELEGRAM
// ========================================
// Este script roda automaticamente quando a página carrega
// Ele pega o link do arquivo config.js e substitui em TODO lugar

(function() {
    'use strict';
    
    console.log('🔄 Iniciando substituição de links do Telegram...');
    
    // Aguardar o config carregar
    function waitForConfig(retries = 10) {
        if (window.TELEGRAM_CONFIG) {
            replaceAllLinks();
        } else if (retries > 0) {
            setTimeout(() => waitForConfig(retries - 1), 500);
        } else {
            console.error('❌ Configuração não encontrada! Verifique se config.js existe.');
        }
    }
    
    function replaceAllLinks() {
        const config = window.TELEGRAM_CONFIG;
        const novoLink = config.link;
        
        console.log(`📱 Substituindo links por: ${novoLink}`);
        
        let count = 0;
        
        // 1. Substituir todos os links <a> do Telegram
        const selectors = [
            'a[href*="t.me"]',
            'a[href*="telegram.me"]', 
            'a[href*="teles.co"]',
            'a[href*="tg.me"]'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(link => {
                if (link.href && (link.href.includes('t.me') || link.href.includes('telegram'))) {
                    const original = link.href.substring(0, 80);
                    link.href = novoLink;
                    count++;
                    console.log(`  ✅ Link alterado: ${original}... → ${novoLink}`);
                }
            });
        });
        
        // 2. Substituir iframes
        document.querySelectorAll('iframe[src*="t.me"], iframe[src*="telegram"]').forEach(iframe => {
            iframe.src = novoLink;
            count++;
        });
        
        // 3. Substituir atributos data
        document.querySelectorAll('[data-telegram], [data-link], [data-url], [data-video-url]').forEach(el => {
            const attrs = ['data-telegram', 'data-link', 'data-url', 'data-video-url'];
            attrs.forEach(attr => {
                if (el.hasAttribute(attr) && el.getAttribute(attr).match(/t.me|telegram|@/)) {
                    el.setAttribute(attr, novoLink);
                    count++;
                }
            });
        });
        
        // 4. Substituir texto com @menções
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.textContent && node.textContent.match(/@[a-zA-Z0-9_]+/)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        const nodesToReplace = [];
        while (walker.nextNode()) {
            nodesToReplace.push(walker.currentNode);
        }
        
        nodesToReplace.forEach(node => {
            const newText = node.textContent.replace(/@[a-zA-Z0-9_]+/g, novoLink);
            if (newText !== node.textContent) {
                node.textContent = newText;
                count++;
            }
        });
        
        console.log(`✅ Substituição concluída! ${count} links alterados.`);
        console.log(`📱 Todos os links agora apontam para: ${novoLink}`);
        
        // Mostrar aviso se nenhum link foi encontrado
        if (count === 0) {
            console.warn('⚠️ Nenhum link do Telegram encontrado nesta página.');
        }
    }
    
    // Iniciar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForConfig);
    } else {
        waitForConfig();
    }
})();
