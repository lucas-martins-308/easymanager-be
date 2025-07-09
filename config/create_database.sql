-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projeto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto` DEFAULT CHARACTER SET utf8 ;
USE `projeto` ;

-- -----------------------------------------------------
-- Table `projeto`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Endereco` (
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `cep` VARCHAR(8) NOT NULL,
  `logradouro` VARCHAR(45) NOT NULL,
  `numero` INT NULL,
  `complemento` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEndereco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nomeCompleto` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `dtNascimento` DATE NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `tipoUsuario` ENUM("adm", "func") NOT NULL,
  `Endereco_idEndereco` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Endereco1_idx` (`Endereco_idEndereco` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Endereco1`
    FOREIGN KEY (`Endereco_idEndereco`)
    REFERENCES `projeto`.`Endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Fornecedor` (
  `idFornecedor` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `Endereco_idEndereco` INT NOT NULL,
  PRIMARY KEY (`idFornecedor`),
  INDEX `fk_Fornecedor_Endereco1_idx` (`Endereco_idEndereco` ASC) VISIBLE,
  CONSTRAINT `fk_Fornecedor_Endereco1`
    FOREIGN KEY (`Endereco_idEndereco`)
    REFERENCES `projeto`.`Endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Hospede`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Hospede` (
  `idHospede` INT NOT NULL AUTO_INCREMENT,
  `nomeCompleto` VARCHAR(100) NOT NULL,
  `documento` VARCHAR(45) NOT NULL,
  `tipoDocumento` VARCHAR(45) NOT NULL,
  `dtNascimento` DATE NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NULL,
  `genero` VARCHAR(1) NOT NULL,
  `preferencia` VARCHAR(45) NULL,
  `Endereco_idEndereco` INT NOT NULL,
  PRIMARY KEY (`idHospede`),
  INDEX `fk_Hospede_Endereco1_idx` (`Endereco_idEndereco` ASC) VISIBLE,
  CONSTRAINT `fk_Hospede_Endereco1`
    FOREIGN KEY (`Endereco_idEndereco`)
    REFERENCES `projeto`.`Endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`EstoqueItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`EstoqueItem` (
  `idItem` INT NOT NULL AUTO_INCREMENT,
  `nomeItem` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `quantidade` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `dtValidade` DATE NULL,
  `Fornecedor_idFornecedor` INT NOT NULL,
  PRIMARY KEY (`idItem`),
  INDEX `fk_EstoqueItem_Fornecedor1_idx` (`Fornecedor_idFornecedor` ASC) VISIBLE,
  CONSTRAINT `fk_EstoqueItem_Fornecedor1`
    FOREIGN KEY (`Fornecedor_idFornecedor`)
    REFERENCES `projeto`.`Fornecedor` (`idFornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Reserva` (
  `idReserva` INT NOT NULL AUTO_INCREMENT,
  `dtCheckin` DATE NOT NULL,
  `dtCheckout` DATE NOT NULL,
  `valorReserva` DECIMAL(10,2) NOT NULL,
  `canalReserva` VARCHAR(45) NOT NULL,
  `statusReserva` ENUM("confirmada", "cancelada", "pendente", "finalizada") NOT NULL,
  `hospedeId` INT,
  PRIMARY KEY (`idReserva`),
  INDEX `fk_reserva_hospede_idx` (`hospedeId` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_hospede`
    FOREIGN KEY (`hospedeId`)
    REFERENCES `projeto`.`Hospede` (`idHospede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`ServicoExtra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`ServicoExtra` (
  `idServicoExtra` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NOT NULL,
  `valor` DECIMAL(10,2) NULL,
  PRIMARY KEY (`idServicoExtra`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Pagamento` (
  `idPagamento` INT NOT NULL AUTO_INCREMENT,
  `valorPago` DECIMAL(10,2) NOT NULL,
  `dtPagamento` DATE NOT NULL,
  `metodoPagamento` ENUM("credito", "debito", "dinheiro", "pix") NOT NULL,
  `Reserva_idReserva` INT NOT NULL,
  PRIMARY KEY (`idPagamento`),
  INDEX `fk_Pagamento_Reserva1_idx` (`Reserva_idReserva` ASC) VISIBLE,
  CONSTRAINT `fk_Pagamento_Reserva1`
    FOREIGN KEY (`Reserva_idReserva`)
    REFERENCES `projeto`.`Reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Quarto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Quarto` (
  `idQuarto` INT NOT NULL AUTO_INCREMENT,
  `numeroQuarto` INT NOT NULL,
  `tipoQuarto` VARCHAR(45) NOT NULL,
  `precoDiaria` DECIMAL(10,2) NOT NULL,
  `capacidade` INT NOT NULL,
  `statusQuarto` ENUM("disponivel", "ocupado", "manutencao") NOT NULL,
  PRIMARY KEY (`idQuarto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`ServicoExtra_has_Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`ServicoExtra_has_Reserva` (
  `ServicoExtra_idServicoExtra` INT NOT NULL,
  `Reserva_idReserva` INT NOT NULL,
  PRIMARY KEY (`ServicoExtra_idServicoExtra`, `Reserva_idReserva`),
  INDEX `fk_ServicoExtra_has_Reserva_Reserva1_idx` (`Reserva_idReserva` ASC) VISIBLE,
  INDEX `fk_ServicoExtra_has_Reserva_ServicoExtra1_idx` (`ServicoExtra_idServicoExtra` ASC) VISIBLE,
  CONSTRAINT `fk_ServicoExtra_has_Reserva_ServicoExtra1`
    FOREIGN KEY (`ServicoExtra_idServicoExtra`)
    REFERENCES `projeto`.`ServicoExtra` (`idServicoExtra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ServicoExtra_has_Reserva_Reserva1`
    FOREIGN KEY (`Reserva_idReserva`)
    REFERENCES `projeto`.`Reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Hospede_has_Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Hospede_has_Reserva` (
  `Hospede_idHospede` INT NOT NULL,
  `Reserva_idReserva` INT NOT NULL,
  PRIMARY KEY (`Hospede_idHospede`, `Reserva_idReserva`),
  INDEX `fk_Hospede_has_Reserva_Reserva1_idx` (`Reserva_idReserva` ASC) VISIBLE,
  INDEX `fk_Hospede_has_Reserva_Hospede1_idx` (`Hospede_idHospede` ASC) VISIBLE,
  CONSTRAINT `fk_Hospede_has_Reserva_Hospede1`
    FOREIGN KEY (`Hospede_idHospede`)
    REFERENCES `projeto`.`Hospede` (`idHospede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Hospede_has_Reserva_Reserva1`
    FOREIGN KEY (`Reserva_idReserva`)
    REFERENCES `projeto`.`Reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`EstoqueItem_has_ServicoExtra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`EstoqueItem_has_ServicoExtra` (
  `EstoqueItem_idItem` INT NOT NULL,
  `ServicoExtra_idServicoExtra` INT NOT NULL,
  PRIMARY KEY (`EstoqueItem_idItem`, `ServicoExtra_idServicoExtra`),
  INDEX `fk_EstoqueItem_has_ServicoExtra_ServicoExtra1_idx` (`ServicoExtra_idServicoExtra` ASC) VISIBLE,
  INDEX `fk_EstoqueItem_has_ServicoExtra_EstoqueItem1_idx` (`EstoqueItem_idItem` ASC) VISIBLE,
  CONSTRAINT `fk_EstoqueItem_has_ServicoExtra_EstoqueItem1`
    FOREIGN KEY (`EstoqueItem_idItem`)
    REFERENCES `projeto`.`EstoqueItem` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EstoqueItem_has_ServicoExtra_ServicoExtra1`
    FOREIGN KEY (`ServicoExtra_idServicoExtra`)
    REFERENCES `projeto`.`ServicoExtra` (`idServicoExtra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto`.`Quarto_has_Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto`.`Quarto_has_Reserva` (
  `Quarto_idQuarto` INT NOT NULL,
  `Reserva_idReserva` INT NOT NULL,
  PRIMARY KEY (`Quarto_idQuarto`, `Reserva_idReserva`),
  INDEX `fk_Quarto_has_Reserva_Reserva1_idx` (`Reserva_idReserva` ASC) VISIBLE,
  INDEX `fk_Quarto_has_Reserva_Quarto1_idx` (`Quarto_idQuarto` ASC) VISIBLE,
  CONSTRAINT `fk_Quarto_has_Reserva_Quarto1`
    FOREIGN KEY (`Quarto_idQuarto`)
    REFERENCES `projeto`.`Quarto` (`idQuarto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quarto_has_Reserva_Reserva1`
    FOREIGN KEY (`Reserva_idReserva`)
    REFERENCES `projeto`.`Reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Inserir dados iniciais
-- -----------------------------------------------------

-- Inserir endereço padrão para o usuário admin
INSERT INTO `projeto`.`Endereco` (`cep`, `logradouro`, `numero`, `complemento`, `cidade`, `estado`, `pais`) 
VALUES ('00000000', 'Rua Admin', 1, 'Admin', 'AdminCity', 'AD', 'Brasil');

-- Inserir usuário admin padrão
-- Senha: admin123 (criptografada com bcrypt)
INSERT INTO `projeto`.`Usuario` (`nomeCompleto`, `cpf`, `dtNascimento`, `telefone`, `email`, `senha`, `tipoUsuario`, `Endereco_idEndereco`) 
VALUES ('Administrador', '00000000000', '1990-01-01', '00000000000', 'admin@admin.com', '$2b$10$cyUjPESQklnnhftJcqMLeeGB0csR7uZt3O7MyaP64JUzy2AEf35HG', 'adm', 1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;