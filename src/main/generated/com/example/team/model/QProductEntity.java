package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProductEntity is a Querydsl query type for ProductEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductEntity extends EntityPathBase<ProductEntity> {

    private static final long serialVersionUID = 574658893L;

    public static final QProductEntity productEntity = new QProductEntity("productEntity");

    public final NumberPath<Integer> memNo = createNumber("memNo", Integer.class);

    public final StringPath proCategory = createString("proCategory");

    public final StringPath proContent = createString("proContent");

    public final DateTimePath<java.time.LocalDateTime> proDate = createDateTime("proDate", java.time.LocalDateTime.class);

    public final StringPath proImg = createString("proImg");

    public final StringPath proLocation = createString("proLocation");

    public final StringPath proNeg = createString("proNeg");

    public final NumberPath<Integer> proNo = createNumber("proNo", Integer.class);

    public final StringPath proPrice = createString("proPrice");

    public final StringPath proState = createString("proState");

    public final StringPath proStatus = createString("proStatus");

    public final StringPath proTitle = createString("proTitle");

    public final StringPath proType = createString("proType");

    public final NumberPath<Integer> proViews = createNumber("proViews", Integer.class);

    public QProductEntity(String variable) {
        super(ProductEntity.class, forVariable(variable));
    }

    public QProductEntity(Path<? extends ProductEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductEntity(PathMetadata metadata) {
        super(ProductEntity.class, metadata);
    }

}

