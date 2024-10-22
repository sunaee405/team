package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPaymentEntity is a Querydsl query type for PaymentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPaymentEntity extends EntityPathBase<PaymentEntity> {

    private static final long serialVersionUID = 962498852L;

    public static final QPaymentEntity paymentEntity = new QPaymentEntity("paymentEntity");

    public final NumberPath<Integer> buyMemNo = createNumber("buyMemNo", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> payDate = createDateTime("payDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> payNo = createNumber("payNo", Integer.class);

    public final NumberPath<Integer> proNo = createNumber("proNo", Integer.class);

    public final NumberPath<Integer> selMemNo = createNumber("selMemNo", Integer.class);

    public QPaymentEntity(String variable) {
        super(PaymentEntity.class, forVariable(variable));
    }

    public QPaymentEntity(Path<? extends PaymentEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPaymentEntity(PathMetadata metadata) {
        super(PaymentEntity.class, metadata);
    }

}

