package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMainCodeEntity is a Querydsl query type for MainCodeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMainCodeEntity extends EntityPathBase<MainCodeEntity> {

    private static final long serialVersionUID = 1637232270L;

    public static final QMainCodeEntity mainCodeEntity = new QMainCodeEntity("mainCodeEntity");

    public final NumberPath<Long> ID = createNumber("ID", Long.class);

    public final StringPath MCO_ID = createString("MCO_ID");

    public final StringPath MCO_VALUE = createString("MCO_VALUE");

    public QMainCodeEntity(String variable) {
        super(MainCodeEntity.class, forVariable(variable));
    }

    public QMainCodeEntity(Path<? extends MainCodeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMainCodeEntity(PathMetadata metadata) {
        super(MainCodeEntity.class, metadata);
    }

}

