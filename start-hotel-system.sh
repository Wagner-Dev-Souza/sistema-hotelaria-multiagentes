#!/bin/bash

# Script de Inicialização do Sistema de Hotelaria
# Este script inicia todos os componentes do sistema

echo "🏨 Iniciando Sistema de Hotelaria..."
echo "===================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js para continuar."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale npm para continuar."
    exit 1
fi

echo "✅ Node.js e npm encontrados."

# Verificar se o diretório do backend existe
if [ ! -d "hotel-backend" ]; then
    echo "❌ Diretório hotel-backend não encontrado."
    exit 1
fi

# Verificar se o diretório do frontend existe
if [ ! -d "hotel-admin" ]; then
    echo "❌ Diretório hotel-admin não encontrado."
    exit 1
fi

echo "✅ Diretórios do sistema encontrados."

# Navegar para o backend e iniciar o servidor
echo "🚀 Iniciando backend na porta 3001..."
cd hotel-backend

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
fi

# Iniciar o backend em background
echo "🔧 Backend iniciando..."
node index.js &
BACKEND_PID=$!

# Voltar ao diretório principal
cd ..

# Aguardar o backend iniciar
echo "⏳ Aguardando backend iniciar..."
sleep 3

# Verificar se o backend está rodando
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend está rodando em http://localhost:3001"
else
    echo "❌ Backend não conseguiu iniciar. Verifique os logs."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "🌐 Frontend pronto para uso."
echo "📋 Frontend disponível em: hotel-admin/index.html"
echo "🔗 Backend API disponível em: http://localhost:3001"
echo "📊 Dashboard de integração disponível em: hotel-integration.html"
echo ""
echo "🎉 Sistema de Hotelaria iniciado com sucesso!"
echo "===================================="
echo ""
echo "Para parar o sistema, execute:"
echo "kill $BACKEND_PID"
echo ""
echo "Para testar a integração, abra:"
echo "  hotel-integration.html"
echo ""
echo "Para acessar o frontend, abra:"
echo "  hotel-admin/index.html"
echo ""
echo "Para testar a API manualmente:"
echo "  curl http://localhost:3001/api/health"