import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";


export enum StateReviews {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

registerEnumType(StateReviews, {
    name: "StateReviews",
    description: "Reviews state",
    valuesConfig: {
        ACTIVE: {
            description: "Basic user role",
        },
        INACTIVE: {
            description: "Moderator user role",
        }
    },
});


@ObjectType()
@Entity()
export class Review extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column("int", { default: 0 })
    rating!: number;

    @Field(() => User)
    @JoinColumn()
    @ManyToOne(() => User, (user: any) => user.reviews)
    creatorUser!: User;

    @Field(() => StateReviews)
    @Column()
    state!: StateReviews;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    updatedAt!: string;

}



