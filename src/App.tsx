import { supabase } from './lib/supabase';
import React, { useState } from 'react';
import { Compass, School, AlertTriangle } from 'lucide-react';

export default function BussolaIntervencao() {
  // 1. Estados para capturar os dados do formulário
  const [nomeEscola, setNomeEscola] = useState('');
  const [anoConstrucao, setAnoConstrucao] = useState('');
  const [limpezaCalha, setLimpezaCalha] = useState('Menos de 6 meses');
  const [estadoTelhado, setEstadoTelhado] = useState('Bom estado');
  const [carregando, setCarregando] = useState(false);

  // 2. Função disparada pelo botão
  const salvarDados = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    setCarregando(true);

    // Cálculo simples de prioridade (exemplo)
    const idadePredio = new Date().getFullYear() - Number(anoConstrucao);
    let score = 0;
    if (idadePredio > 40) score += 30;
    if (limpezaCalha === 'Mais de 1 ano') score += 40;
    if (estadoTelhado === 'Estrutura comprometida') score += 50;

    const { error } = await supabase
      .from('escolas_prioridades')
      .insert([
        { 
          nome_escola: nomeEscola, 
          ano_construcao: Number(anoConstrucao), 
          ultima_limpeza_calha: limpezaCalha, 
          estado_telhado: estadoTelhado,
          score_prioridade: score
        },
      ]);

    setCarregando(false);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      alert('Dados salvos com sucesso na Bússola!');
      // Limpa o formulário
      setNomeEscola('');
      setAnoConstrucao('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-blue-900 text-white p-6 shadow-lg">
        <div className="container mx-auto flex items-center gap-3">
          <Compass size={40} className="text-yellow-400" />
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wider">Bússola de Intervenção</h1>
            <p className="text-sm opacity-80">URE GUARULHOS SUL - Gestão de Prioridades</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700">
              <School className="text-blue-600" /> Cadastrar Dados da Unidade Escolar
            </h2>
            
            <form onSubmit={salvarDados} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Escola</label>
                  <input 
                    required
                    type="text" 
                    value={nomeEscola}
                    onChange={(e) => setNomeEscola(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 focus:ring-blue-500" 
                    placeholder="Ex: EE Prof. João Silva" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ano de Construção do Prédio</label>
                  <input 
                    required
                    type="number" 
                    value={anoConstrucao}
                    onChange={(e) => setAnoConstrucao(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50" 
                    placeholder="Ex: 1980" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Última Limpeza de Calha</label>
                  <select 
                    value={limpezaCalha}
                    onChange={(e) => setLimpezaCalha(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                  >
                    <option>Menos de 6 meses</option>
                    <option>Entre 6 meses e 1 ano</option>
                    <option>Mais de 1 ano</option>
                    <option>Não sabe informar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado Visual do Telhado</label>
                  <select 
                    value={estadoTelhado}
                    onChange={(e) => setEstadoTelhado(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                  >
                    <option>Bom estado</option>
                    <option>Goteiras isoladas</option>
                    <option>Estrutura comprometida</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={carregando}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400"
              >
                {carregando ? 'Salvando...' : 'Calcular Prioridade e Salvar'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
                <AlertTriangle size={20} /> Atenção Crítica
              </div>
              <p className="text-sm text-yellow-700">
                Escolas com construção anterior a 1975 e sem limpeza de calhas há mais de 1 ano entram automaticamente no topo da lista.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
