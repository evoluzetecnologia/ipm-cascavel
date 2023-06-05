PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM ipm_cliente;

DROP TABLE ipm_cliente;

CREATE TABLE ipm_cliente (
    ID_CLIENTE                   INTEGER     PRIMARY KEY
                                             REFERENCES cliente (ID_CLIENTE),
    IPM_ID                       TEXT        DEFAULT '',
    IPM_LOGIN                    TEXT        DEFAULT '',
    IPM_PASSWORD                 TEXT        DEFAULT '',
    IPM_CODIGO_LOGIN             TEXT        DEFAULT '',
    CADASTRO_ECONOMICO           TEXT        DEFAULT '',
    EMITE_NFS                    BOOLEAN     DEFAULT (FALSE),
    DECLARACAO_TOMADOS           BOOLEAN     DEFAULT (FALSE),
    LANCA_NOTA_TOMADOS           BOOLEAN     DEFAULT (FALSE),
    PERIODO_XML_SAIDA            VARCHAR (7) DEFAULT '',
    PERIODO_XML_ENTRADA          VARCHAR (7) DEFAULT '',
    PERIODO_DECLARACAO_PRESTADOS VARCHAR (7) DEFAULT '',
    PERIODO_DECLARACAO_TOMADOS   VARCHAR (7) DEFAULT '',
    PERIODO_SIMPLES_NACIONAL     VARCHAR (7) DEFAULT '',
    DIA_XML_SAIDA                INTEGER (2) DEFAULT (0),
    DIA_XML_ENTRADA              INTEGER (2) DEFAULT (0),
    DIA_DECLARACAO_PRESTADOS     INTEGER (2) DEFAULT (0),
    DIA_DECLARACAO_TOMADOS       INTEGER (2) DEFAULT (0),
    DIA_SIMPLES_NACIONAL         INTEGER (2) DEFAULT (0),
    DOWNLOAD_SAIDA               TEXT        DEFAULT '',
    DOWNLOAD_ENTRADA             TEXT        DEFAULT ''
);

INSERT INTO ipm_cliente (
                            ID_CLIENTE,
                            IPM_ID,
                            IPM_LOGIN,
                            IPM_PASSWORD,
                            IPM_CODIGO_LOGIN,
                            CADASTRO_ECONOMICO,
                            EMITE_NFS,
                            DECLARACAO_TOMADOS,
                            LANCA_NOTA_TOMADOS,
                            PERIODO_XML_SAIDA,
                            PERIODO_XML_ENTRADA,
                            PERIODO_DECLARACAO_PRESTADOS,
                            PERIODO_DECLARACAO_TOMADOS,
                            PERIODO_SIMPLES_NACIONAL,
                            DIA_XML_SAIDA,
                            DIA_XML_ENTRADA,
                            DIA_DECLARACAO_PRESTADOS,
                            DIA_DECLARACAO_TOMADOS,
                            DIA_SIMPLES_NACIONAL
                        )
                        SELECT ID_CLIENTE,
                               IPM_ID,
                               IPM_LOGIN,
                               IPM_PASSWORD,
                               IPM_CODIGO_LOGIN,
                               CADASTRO_ECONOMICO,
                               EMITE_NFS,
                               DECLARACAO_TOMADOS,
                               LANCA_NOTA_TOMADOS,
                               PERIODO_XML_SAIDA,
                               PERIODO_XML_ENTRADA,
                               PERIODO_DECLARACAO_PRESTADOS,
                               PERIODO_DECLARACAO_TOMADOS,
                               PERIODO_SIMPLES_NACIONAL,
                               DIA_XML_SAIDA,
                               DIA_XML_ENTRADA,
                               DIA_DECLARACAO_PRESTADOS,
                               DIA_DECLARACAO_TOMADOS,
                               DIA_SIMPLES_NACIONAL
                          FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;