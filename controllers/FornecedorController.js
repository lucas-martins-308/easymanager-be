const Fornecedor = require('../models/Fornecedor');
const Endereco = require('../models/Endereco');

class FornecedorController {
    // Listar todos os fornecedores
    static async listar(req, res) {
        try {
            const fornecedores = await Fornecedor.findAll({
                include: [{ model: Endereco, as: 'endereco' }]
            });
            res.json(fornecedores);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Buscar fornecedor por ID
    static async buscarPorId(req, res) {
        try {
            const fornecedor = await Fornecedor.findByPk(req.params.id, {
                include: [{ model: Endereco, as: 'endereco' }]
            });
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.json(fornecedor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Criar novo fornecedor
    static async criar(req, res) {
        try {
            console.log('Dados recebidos:', req.body);
            
            const { endereco, ...fornecedorData } = req.body;
            
            let enderecoId = fornecedorData.Endereco_idEndereco;
            
            // Se não foi fornecido um endereço ID, criar um novo endereço
            if (!enderecoId && endereco) {
                console.log('Criando novo endereço:', endereco);
                const enderecoData = {
                    ...endereco,
                    numero: endereco.numero ? parseInt(endereco.numero) : null
                };
                const novoEndereco = await Endereco.create(enderecoData);
                enderecoId = novoEndereco.idEndereco;
                console.log('Endereço criado com ID:', enderecoId);
            }
            
            // Se ainda não tem endereço ID, usar um padrão
            if (!enderecoId) {
                console.log('Buscando endereço padrão...');
                // Buscar um endereço existente ou criar um padrão
                const enderecoPadrao = await Endereco.findOne();
                if (enderecoPadrao) {
                    enderecoId = enderecoPadrao.idEndereco;
                    console.log('Usando endereço existente:', enderecoId);
                } else {
                    console.log('Criando endereço padrão...');
                    // Criar endereço padrão se não existir nenhum
                    const novoEnderecoPadrao = await Endereco.create({
                        cep: '00000000',
                        logradouro: 'Endereço Padrão',
                        numero: 0,
                        complemento: 'Padrão',
                        cidade: 'Cidade Padrão',
                        estado: 'SP',
                        pais: 'Brasil'
                    });
                    enderecoId = novoEnderecoPadrao.idEndereco;
                    console.log('Endereço padrão criado:', enderecoId);
                }
            }
            
            fornecedorData.Endereco_idEndereco = enderecoId;
            console.log('Dados do fornecedor para criar:', fornecedorData);
            
            const fornecedor = await Fornecedor.create(fornecedorData);
            console.log('Fornecedor criado:', fornecedor.idFornecedor);
            
            // Retornar o fornecedor com o endereço incluído
            const fornecedorCompleto = await Fornecedor.findByPk(fornecedor.idFornecedor, {
                include: [{ model: Endereco, as: 'endereco' }]
            });
            
            console.log('Fornecedor completo retornado:', fornecedorCompleto);
            res.status(201).json(fornecedorCompleto);
        } catch (err) {
            console.error('Erro detalhado ao criar fornecedor:', err);
            console.error('Stack trace:', err.stack);
            res.status(400).json({ 
                message: err.message,
                details: err.errors ? err.errors.map(e => e.message) : [],
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
        }
    }

    // Atualizar fornecedor
    static async atualizar(req, res) {
        try {
            const { endereco, ...fornecedorData } = req.body;
            const fornecedorId = req.params.id;
            
            // Buscar o fornecedor atual
            const fornecedorAtual = await Fornecedor.findByPk(fornecedorId, {
                include: [{ model: Endereco, as: 'endereco' }]
            });
            
            if (!fornecedorAtual) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            
            // Se há dados de endereço, atualizar o endereço
            if (endereco && fornecedorAtual.endereco) {
                const enderecoData = {
                    ...endereco,
                    numero: endereco.numero ? parseInt(endereco.numero) : null
                };
                await Endereco.update(enderecoData, {
                    where: { idEndereco: fornecedorAtual.endereco.idEndereco }
                });
            }
            
            // Atualizar dados do fornecedor
            await Fornecedor.update(fornecedorData, {
                where: { idFornecedor: fornecedorId }
            });
            
            // Retornar o fornecedor atualizado com endereço
            const fornecedorAtualizado = await Fornecedor.findByPk(fornecedorId, {
                include: [{ model: Endereco, as: 'endereco' }]
            });
            
            res.json(fornecedorAtualizado);
        } catch (err) {
            console.error('Erro ao atualizar fornecedor:', err);
            res.status(400).json({ message: err.message });
        }
    }

    // Remover fornecedor
    static async remover(req, res) {
        try {
            const deleted = await Fornecedor.destroy({
                where: { idFornecedor: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.json({ message: 'Fornecedor removido com sucesso' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = FornecedorController; 