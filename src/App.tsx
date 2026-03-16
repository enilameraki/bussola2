import { supabase } from './lib/supabase';
import React, { useState } from 'react';
import { Compass, School, Tool, AlertTriangle } from 'lucide-react';

export default function BussolaIntervencao() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
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
          
          {/* Coluna de Cadastro (Formulário) */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700">
              <School className="text-blue-600" /> Cadastrar Dados da Unidade Escolar
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Escola</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: EE Prof. João Silva" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ano de Construção do Prédio</label>
                  <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50" placeholder="Ex: 1980" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Última Limpeza de Calha</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50">
                    <option>Menos de 6 meses</option>
                    <option>Entre 6 meses e 1 ano</option>
                    <option>Mais de 1 ano</option>
                    <option>Não sabe informar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado Visual do Telhado</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50">
                    <option>Bom estado</option>
                    <option>Goteiras isoladas</option>
                    <option>Estrutura comprometida</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors">
                Calcular Prioridade e Salvar
              </button>
            </form>
          </div>

          {/* Coluna de Resumo/Alertas */}
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
                <AlertTriangle size={20} /> Atenção Crítica
              </div>
              <p className="text-sm text-yellow-700">
                Escolas com construção anterior a 1975 e sem limpeza de calhas há mais de 1 ano entram automaticamente no topo da lista.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Métrica de Cálculo</h3>
              <ul className="text-xs space-y-2 text-gray-600">
                <li className="flex justify-between"><span>Idade do Prédio</span> <span>Pelo Ano</span></li>
                <li className="flex justify-between"><span>Manutenção Calha</span> <span>Peso 2.5</span></li>
                <li className="flex justify-between"><span>Histórico de Reformas</span> <span>Peso 3.0</span></li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
