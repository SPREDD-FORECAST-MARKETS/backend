
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Market
 * 
 */
export type Market = $Result.DefaultSelection<Prisma.$MarketPayload>
/**
 * Model Outcome
 * 
 */
export type Outcome = $Result.DefaultSelection<Prisma.$OutcomePayload>
/**
 * Model TokenAllocation
 * 
 */
export type TokenAllocation = $Result.DefaultSelection<Prisma.$TokenAllocationPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VoteType: {
  YES: 'YES',
  NO: 'NO'
};

export type VoteType = (typeof VoteType)[keyof typeof VoteType]


export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  VOTERS: 'VOTERS'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  RESET_PASSWORD: 'RESET_PASSWORD',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const EventStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CLOSED: 'CLOSED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const EventOption: {
  OPTION_A: 'OPTION_A',
  OPTION_B: 'OPTION_B'
};

export type EventOption = (typeof EventOption)[keyof typeof EventOption]


export const OrderType: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]

}

export type VoteType = $Enums.VoteType

export const VoteType: typeof $Enums.VoteType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

export type EventOption = $Enums.EventOption

export const EventOption: typeof $Enums.EventOption

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.market`: Exposes CRUD operations for the **Market** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Markets
    * const markets = await prisma.market.findMany()
    * ```
    */
  get market(): Prisma.MarketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outcome`: Exposes CRUD operations for the **Outcome** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outcomes
    * const outcomes = await prisma.outcome.findMany()
    * ```
    */
  get outcome(): Prisma.OutcomeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenAllocation`: Exposes CRUD operations for the **TokenAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenAllocations
    * const tokenAllocations = await prisma.tokenAllocation.findMany()
    * ```
    */
  get tokenAllocation(): Prisma.TokenAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Market: 'Market',
    Outcome: 'Outcome',
    TokenAllocation: 'TokenAllocation',
    Trade: 'Trade'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "market" | "outcome" | "tokenAllocation" | "trade"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Market: {
        payload: Prisma.$MarketPayload<ExtArgs>
        fields: Prisma.MarketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findFirst: {
            args: Prisma.MarketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findMany: {
            args: Prisma.MarketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          create: {
            args: Prisma.MarketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          createMany: {
            args: Prisma.MarketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          delete: {
            args: Prisma.MarketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          update: {
            args: Prisma.MarketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          deleteMany: {
            args: Prisma.MarketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          upsert: {
            args: Prisma.MarketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          aggregate: {
            args: Prisma.MarketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarket>
          }
          groupBy: {
            args: Prisma.MarketGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketCountArgs<ExtArgs>
            result: $Utils.Optional<MarketCountAggregateOutputType> | number
          }
        }
      }
      Outcome: {
        payload: Prisma.$OutcomePayload<ExtArgs>
        fields: Prisma.OutcomeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutcomeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutcomeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          findFirst: {
            args: Prisma.OutcomeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutcomeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          findMany: {
            args: Prisma.OutcomeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>[]
          }
          create: {
            args: Prisma.OutcomeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          createMany: {
            args: Prisma.OutcomeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutcomeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>[]
          }
          delete: {
            args: Prisma.OutcomeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          update: {
            args: Prisma.OutcomeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          deleteMany: {
            args: Prisma.OutcomeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutcomeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutcomeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>[]
          }
          upsert: {
            args: Prisma.OutcomeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutcomePayload>
          }
          aggregate: {
            args: Prisma.OutcomeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutcome>
          }
          groupBy: {
            args: Prisma.OutcomeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutcomeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutcomeCountArgs<ExtArgs>
            result: $Utils.Optional<OutcomeCountAggregateOutputType> | number
          }
        }
      }
      TokenAllocation: {
        payload: Prisma.$TokenAllocationPayload<ExtArgs>
        fields: Prisma.TokenAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          findFirst: {
            args: Prisma.TokenAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          findMany: {
            args: Prisma.TokenAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>[]
          }
          create: {
            args: Prisma.TokenAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          createMany: {
            args: Prisma.TokenAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>[]
          }
          delete: {
            args: Prisma.TokenAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          update: {
            args: Prisma.TokenAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          deleteMany: {
            args: Prisma.TokenAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>[]
          }
          upsert: {
            args: Prisma.TokenAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenAllocationPayload>
          }
          aggregate: {
            args: Prisma.TokenAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenAllocation>
          }
          groupBy: {
            args: Prisma.TokenAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<TokenAllocationCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    market?: MarketOmit
    outcome?: OutcomeOmit
    tokenAllocation?: TokenAllocationOmit
    trade?: TradeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    markets: number
    trades: number
    token_allocated: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    markets?: boolean | UserCountOutputTypeCountMarketsArgs
    trades?: boolean | UserCountOutputTypeCountTradesArgs
    token_allocated?: boolean | UserCountOutputTypeCountToken_allocatedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMarketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountToken_allocatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenAllocationWhereInput
  }


  /**
   * Count Type MarketCountOutputType
   */

  export type MarketCountOutputType = {
    trades: number
    outcome: number
  }

  export type MarketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | MarketCountOutputTypeCountTradesArgs
    outcome?: boolean | MarketCountOutputTypeCountOutcomeArgs
  }

  // Custom InputTypes
  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketCountOutputType
     */
    select?: MarketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountOutcomeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutcomeWhereInput
  }


  /**
   * Count Type OutcomeCountOutputType
   */

  export type OutcomeCountOutputType = {
    tokenAllocations: number
    trades: number
  }

  export type OutcomeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenAllocations?: boolean | OutcomeCountOutputTypeCountTokenAllocationsArgs
    trades?: boolean | OutcomeCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * OutcomeCountOutputType without action
   */
  export type OutcomeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutcomeCountOutputType
     */
    select?: OutcomeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OutcomeCountOutputType without action
   */
  export type OutcomeCountOutputTypeCountTokenAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenAllocationWhereInput
  }

  /**
   * OutcomeCountOutputType without action
   */
  export type OutcomeCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    about: string | null
    wallet_address: string | null
    role: $Enums.Role | null
    profile_pic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    about: string | null
    wallet_address: string | null
    role: $Enums.Role | null
    profile_pic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    about: number
    wallet_address: number
    role: number
    profile_pic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    about?: true
    wallet_address?: true
    role?: true
    profile_pic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    about?: true
    wallet_address?: true
    role?: true
    profile_pic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    about?: true
    wallet_address?: true
    role?: true
    profile_pic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    about: string
    wallet_address: string
    role: $Enums.Role
    profile_pic: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    about?: boolean
    wallet_address?: boolean
    role?: boolean
    profile_pic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    markets?: boolean | User$marketsArgs<ExtArgs>
    trades?: boolean | User$tradesArgs<ExtArgs>
    token_allocated?: boolean | User$token_allocatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    about?: boolean
    wallet_address?: boolean
    role?: boolean
    profile_pic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    about?: boolean
    wallet_address?: boolean
    role?: boolean
    profile_pic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    about?: boolean
    wallet_address?: boolean
    role?: boolean
    profile_pic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "about" | "wallet_address" | "role" | "profile_pic" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    markets?: boolean | User$marketsArgs<ExtArgs>
    trades?: boolean | User$tradesArgs<ExtArgs>
    token_allocated?: boolean | User$token_allocatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      markets: Prisma.$MarketPayload<ExtArgs>[]
      trades: Prisma.$TradePayload<ExtArgs>[]
      token_allocated: Prisma.$TokenAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      about: string
      wallet_address: string
      role: $Enums.Role
      profile_pic: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    markets<T extends User$marketsArgs<ExtArgs> = {}>(args?: Subset<T, User$marketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trades<T extends User$tradesArgs<ExtArgs> = {}>(args?: Subset<T, User$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    token_allocated<T extends User$token_allocatedArgs<ExtArgs> = {}>(args?: Subset<T, User$token_allocatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly about: FieldRef<"User", 'String'>
    readonly wallet_address: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly profile_pic: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.markets
   */
  export type User$marketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    where?: MarketWhereInput
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    cursor?: MarketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * User.trades
   */
  export type User$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * User.token_allocated
   */
  export type User$token_allocatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    where?: TokenAllocationWhereInput
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    cursor?: TokenAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenAllocationScalarFieldEnum | TokenAllocationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Market
   */

  export type AggregateMarket = {
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  export type MarketAvgAggregateOutputType = {
    id: number | null
    outcomeWon: number | null
    creatorId: number | null
  }

  export type MarketSumAggregateOutputType = {
    id: number | null
    outcomeWon: number | null
    creatorId: number | null
  }

  export type MarketMinAggregateOutputType = {
    id: number | null
    description: string | null
    resolution_criteria: string | null
    question: string | null
    expiry_date: Date | null
    image: string | null
    status: $Enums.EventStatus | null
    outcomeWon: number | null
    creatorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketMaxAggregateOutputType = {
    id: number | null
    description: string | null
    resolution_criteria: string | null
    question: string | null
    expiry_date: Date | null
    image: string | null
    status: $Enums.EventStatus | null
    outcomeWon: number | null
    creatorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketCountAggregateOutputType = {
    id: number
    description: number
    resolution_criteria: number
    question: number
    expiry_date: number
    image: number
    tags: number
    status: number
    outcomeWon: number
    creatorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarketAvgAggregateInputType = {
    id?: true
    outcomeWon?: true
    creatorId?: true
  }

  export type MarketSumAggregateInputType = {
    id?: true
    outcomeWon?: true
    creatorId?: true
  }

  export type MarketMinAggregateInputType = {
    id?: true
    description?: true
    resolution_criteria?: true
    question?: true
    expiry_date?: true
    image?: true
    status?: true
    outcomeWon?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketMaxAggregateInputType = {
    id?: true
    description?: true
    resolution_criteria?: true
    question?: true
    expiry_date?: true
    image?: true
    status?: true
    outcomeWon?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketCountAggregateInputType = {
    id?: true
    description?: true
    resolution_criteria?: true
    question?: true
    expiry_date?: true
    image?: true
    tags?: true
    status?: true
    outcomeWon?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Market to aggregate.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Markets
    **/
    _count?: true | MarketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketMaxAggregateInputType
  }

  export type GetMarketAggregateType<T extends MarketAggregateArgs> = {
        [P in keyof T & keyof AggregateMarket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarket[P]>
      : GetScalarType<T[P], AggregateMarket[P]>
  }




  export type MarketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketWhereInput
    orderBy?: MarketOrderByWithAggregationInput | MarketOrderByWithAggregationInput[]
    by: MarketScalarFieldEnum[] | MarketScalarFieldEnum
    having?: MarketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketCountAggregateInputType | true
    _avg?: MarketAvgAggregateInputType
    _sum?: MarketSumAggregateInputType
    _min?: MarketMinAggregateInputType
    _max?: MarketMaxAggregateInputType
  }

  export type MarketGroupByOutputType = {
    id: number
    description: string
    resolution_criteria: string
    question: string
    expiry_date: Date
    image: string | null
    tags: string[]
    status: $Enums.EventStatus
    outcomeWon: number | null
    creatorId: number
    createdAt: Date
    updatedAt: Date
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  type GetMarketGroupByPayload<T extends MarketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketGroupByOutputType[P]>
            : GetScalarType<T[P], MarketGroupByOutputType[P]>
        }
      >
    >


  export type MarketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    resolution_criteria?: boolean
    question?: boolean
    expiry_date?: boolean
    image?: boolean
    tags?: boolean
    status?: boolean
    outcomeWon?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    trades?: boolean | Market$tradesArgs<ExtArgs>
    outcome?: boolean | Market$outcomeArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["market"]>

  export type MarketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    resolution_criteria?: boolean
    question?: boolean
    expiry_date?: boolean
    image?: boolean
    tags?: boolean
    status?: boolean
    outcomeWon?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["market"]>

  export type MarketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    resolution_criteria?: boolean
    question?: boolean
    expiry_date?: boolean
    image?: boolean
    tags?: boolean
    status?: boolean
    outcomeWon?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["market"]>

  export type MarketSelectScalar = {
    id?: boolean
    description?: boolean
    resolution_criteria?: boolean
    question?: boolean
    expiry_date?: boolean
    image?: boolean
    tags?: boolean
    status?: boolean
    outcomeWon?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "resolution_criteria" | "question" | "expiry_date" | "image" | "tags" | "status" | "outcomeWon" | "creatorId" | "createdAt" | "updatedAt", ExtArgs["result"]["market"]>
  export type MarketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    trades?: boolean | Market$tradesArgs<ExtArgs>
    outcome?: boolean | Market$outcomeArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MarketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MarketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MarketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Market"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      trades: Prisma.$TradePayload<ExtArgs>[]
      outcome: Prisma.$OutcomePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      description: string
      resolution_criteria: string
      question: string
      expiry_date: Date
      image: string | null
      tags: string[]
      status: $Enums.EventStatus
      outcomeWon: number | null
      creatorId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["market"]>
    composites: {}
  }

  type MarketGetPayload<S extends boolean | null | undefined | MarketDefaultArgs> = $Result.GetResult<Prisma.$MarketPayload, S>

  type MarketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketCountAggregateInputType | true
    }

  export interface MarketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Market'], meta: { name: 'Market' } }
    /**
     * Find zero or one Market that matches the filter.
     * @param {MarketFindUniqueArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketFindUniqueArgs>(args: SelectSubset<T, MarketFindUniqueArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Market that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketFindUniqueOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketFindFirstArgs>(args?: SelectSubset<T, MarketFindFirstArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Markets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Markets
     * const markets = await prisma.market.findMany()
     * 
     * // Get first 10 Markets
     * const markets = await prisma.market.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketWithIdOnly = await prisma.market.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketFindManyArgs>(args?: SelectSubset<T, MarketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Market.
     * @param {MarketCreateArgs} args - Arguments to create a Market.
     * @example
     * // Create one Market
     * const Market = await prisma.market.create({
     *   data: {
     *     // ... data to create a Market
     *   }
     * })
     * 
     */
    create<T extends MarketCreateArgs>(args: SelectSubset<T, MarketCreateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Markets.
     * @param {MarketCreateManyArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketCreateManyArgs>(args?: SelectSubset<T, MarketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Markets and returns the data saved in the database.
     * @param {MarketCreateManyAndReturnArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Market.
     * @param {MarketDeleteArgs} args - Arguments to delete one Market.
     * @example
     * // Delete one Market
     * const Market = await prisma.market.delete({
     *   where: {
     *     // ... filter to delete one Market
     *   }
     * })
     * 
     */
    delete<T extends MarketDeleteArgs>(args: SelectSubset<T, MarketDeleteArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Market.
     * @param {MarketUpdateArgs} args - Arguments to update one Market.
     * @example
     * // Update one Market
     * const market = await prisma.market.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketUpdateArgs>(args: SelectSubset<T, MarketUpdateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Markets.
     * @param {MarketDeleteManyArgs} args - Arguments to filter Markets to delete.
     * @example
     * // Delete a few Markets
     * const { count } = await prisma.market.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketDeleteManyArgs>(args?: SelectSubset<T, MarketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketUpdateManyArgs>(args: SelectSubset<T, MarketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets and returns the data updated in the database.
     * @param {MarketUpdateManyAndReturnArgs} args - Arguments to update many Markets.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Market.
     * @param {MarketUpsertArgs} args - Arguments to update or create a Market.
     * @example
     * // Update or create a Market
     * const market = await prisma.market.upsert({
     *   create: {
     *     // ... data to create a Market
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Market we want to update
     *   }
     * })
     */
    upsert<T extends MarketUpsertArgs>(args: SelectSubset<T, MarketUpsertArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketCountArgs} args - Arguments to filter Markets to count.
     * @example
     * // Count the number of Markets
     * const count = await prisma.market.count({
     *   where: {
     *     // ... the filter for the Markets we want to count
     *   }
     * })
    **/
    count<T extends MarketCountArgs>(
      args?: Subset<T, MarketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketAggregateArgs>(args: Subset<T, MarketAggregateArgs>): Prisma.PrismaPromise<GetMarketAggregateType<T>>

    /**
     * Group by Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketGroupByArgs['orderBy'] }
        : { orderBy?: MarketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Market model
   */
  readonly fields: MarketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Market.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trades<T extends Market$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Market$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outcome<T extends Market$outcomeArgs<ExtArgs> = {}>(args?: Subset<T, Market$outcomeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Market model
   */
  interface MarketFieldRefs {
    readonly id: FieldRef<"Market", 'Int'>
    readonly description: FieldRef<"Market", 'String'>
    readonly resolution_criteria: FieldRef<"Market", 'String'>
    readonly question: FieldRef<"Market", 'String'>
    readonly expiry_date: FieldRef<"Market", 'DateTime'>
    readonly image: FieldRef<"Market", 'String'>
    readonly tags: FieldRef<"Market", 'String[]'>
    readonly status: FieldRef<"Market", 'EventStatus'>
    readonly outcomeWon: FieldRef<"Market", 'Int'>
    readonly creatorId: FieldRef<"Market", 'Int'>
    readonly createdAt: FieldRef<"Market", 'DateTime'>
    readonly updatedAt: FieldRef<"Market", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Market findUnique
   */
  export type MarketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findUniqueOrThrow
   */
  export type MarketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findFirst
   */
  export type MarketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findFirstOrThrow
   */
  export type MarketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findMany
   */
  export type MarketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Markets to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market create
   */
  export type MarketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to create a Market.
     */
    data: XOR<MarketCreateInput, MarketUncheckedCreateInput>
  }

  /**
   * Market createMany
   */
  export type MarketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market createManyAndReturn
   */
  export type MarketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Market update
   */
  export type MarketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to update a Market.
     */
    data: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
    /**
     * Choose, which Market to update.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market updateMany
   */
  export type MarketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market updateManyAndReturn
   */
  export type MarketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Market upsert
   */
  export type MarketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The filter to search for the Market to update in case it exists.
     */
    where: MarketWhereUniqueInput
    /**
     * In case the Market found by the `where` argument doesn't exist, create a new Market with this data.
     */
    create: XOR<MarketCreateInput, MarketUncheckedCreateInput>
    /**
     * In case the Market was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
  }

  /**
   * Market delete
   */
  export type MarketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter which Market to delete.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market deleteMany
   */
  export type MarketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Markets to delete
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to delete.
     */
    limit?: number
  }

  /**
   * Market.trades
   */
  export type Market$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Market.outcome
   */
  export type Market$outcomeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    where?: OutcomeWhereInput
    orderBy?: OutcomeOrderByWithRelationInput | OutcomeOrderByWithRelationInput[]
    cursor?: OutcomeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutcomeScalarFieldEnum | OutcomeScalarFieldEnum[]
  }

  /**
   * Market without action
   */
  export type MarketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
  }


  /**
   * Model Outcome
   */

  export type AggregateOutcome = {
    _count: OutcomeCountAggregateOutputType | null
    _avg: OutcomeAvgAggregateOutputType | null
    _sum: OutcomeSumAggregateOutputType | null
    _min: OutcomeMinAggregateOutputType | null
    _max: OutcomeMaxAggregateOutputType | null
  }

  export type OutcomeAvgAggregateOutputType = {
    id: number | null
    current_supply: Decimal | null
    total_liquidity: Decimal | null
    marketID: number | null
  }

  export type OutcomeSumAggregateOutputType = {
    id: number | null
    current_supply: Decimal | null
    total_liquidity: Decimal | null
    marketID: number | null
  }

  export type OutcomeMinAggregateOutputType = {
    id: number | null
    outcome_title: string | null
    current_supply: Decimal | null
    total_liquidity: Decimal | null
    marketID: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OutcomeMaxAggregateOutputType = {
    id: number | null
    outcome_title: string | null
    current_supply: Decimal | null
    total_liquidity: Decimal | null
    marketID: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OutcomeCountAggregateOutputType = {
    id: number
    outcome_title: number
    current_supply: number
    total_liquidity: number
    marketID: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OutcomeAvgAggregateInputType = {
    id?: true
    current_supply?: true
    total_liquidity?: true
    marketID?: true
  }

  export type OutcomeSumAggregateInputType = {
    id?: true
    current_supply?: true
    total_liquidity?: true
    marketID?: true
  }

  export type OutcomeMinAggregateInputType = {
    id?: true
    outcome_title?: true
    current_supply?: true
    total_liquidity?: true
    marketID?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OutcomeMaxAggregateInputType = {
    id?: true
    outcome_title?: true
    current_supply?: true
    total_liquidity?: true
    marketID?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OutcomeCountAggregateInputType = {
    id?: true
    outcome_title?: true
    current_supply?: true
    total_liquidity?: true
    marketID?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OutcomeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outcome to aggregate.
     */
    where?: OutcomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outcomes to fetch.
     */
    orderBy?: OutcomeOrderByWithRelationInput | OutcomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutcomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outcomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outcomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outcomes
    **/
    _count?: true | OutcomeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutcomeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutcomeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutcomeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutcomeMaxAggregateInputType
  }

  export type GetOutcomeAggregateType<T extends OutcomeAggregateArgs> = {
        [P in keyof T & keyof AggregateOutcome]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutcome[P]>
      : GetScalarType<T[P], AggregateOutcome[P]>
  }




  export type OutcomeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutcomeWhereInput
    orderBy?: OutcomeOrderByWithAggregationInput | OutcomeOrderByWithAggregationInput[]
    by: OutcomeScalarFieldEnum[] | OutcomeScalarFieldEnum
    having?: OutcomeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutcomeCountAggregateInputType | true
    _avg?: OutcomeAvgAggregateInputType
    _sum?: OutcomeSumAggregateInputType
    _min?: OutcomeMinAggregateInputType
    _max?: OutcomeMaxAggregateInputType
  }

  export type OutcomeGroupByOutputType = {
    id: number
    outcome_title: string
    current_supply: Decimal
    total_liquidity: Decimal
    marketID: number
    createdAt: Date
    updatedAt: Date
    _count: OutcomeCountAggregateOutputType | null
    _avg: OutcomeAvgAggregateOutputType | null
    _sum: OutcomeSumAggregateOutputType | null
    _min: OutcomeMinAggregateOutputType | null
    _max: OutcomeMaxAggregateOutputType | null
  }

  type GetOutcomeGroupByPayload<T extends OutcomeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutcomeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutcomeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutcomeGroupByOutputType[P]>
            : GetScalarType<T[P], OutcomeGroupByOutputType[P]>
        }
      >
    >


  export type OutcomeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outcome_title?: boolean
    current_supply?: boolean
    total_liquidity?: boolean
    marketID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
    tokenAllocations?: boolean | Outcome$tokenAllocationsArgs<ExtArgs>
    trades?: boolean | Outcome$tradesArgs<ExtArgs>
    _count?: boolean | OutcomeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outcome"]>

  export type OutcomeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outcome_title?: boolean
    current_supply?: boolean
    total_liquidity?: boolean
    marketID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outcome"]>

  export type OutcomeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outcome_title?: boolean
    current_supply?: boolean
    total_liquidity?: boolean
    marketID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outcome"]>

  export type OutcomeSelectScalar = {
    id?: boolean
    outcome_title?: boolean
    current_supply?: boolean
    total_liquidity?: boolean
    marketID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OutcomeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outcome_title" | "current_supply" | "total_liquidity" | "marketID" | "createdAt" | "updatedAt", ExtArgs["result"]["outcome"]>
  export type OutcomeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
    tokenAllocations?: boolean | Outcome$tokenAllocationsArgs<ExtArgs>
    trades?: boolean | Outcome$tradesArgs<ExtArgs>
    _count?: boolean | OutcomeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OutcomeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type OutcomeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $OutcomePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outcome"
    objects: {
      market: Prisma.$MarketPayload<ExtArgs>
      tokenAllocations: Prisma.$TokenAllocationPayload<ExtArgs>[]
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outcome_title: string
      current_supply: Prisma.Decimal
      total_liquidity: Prisma.Decimal
      marketID: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["outcome"]>
    composites: {}
  }

  type OutcomeGetPayload<S extends boolean | null | undefined | OutcomeDefaultArgs> = $Result.GetResult<Prisma.$OutcomePayload, S>

  type OutcomeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutcomeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutcomeCountAggregateInputType | true
    }

  export interface OutcomeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outcome'], meta: { name: 'Outcome' } }
    /**
     * Find zero or one Outcome that matches the filter.
     * @param {OutcomeFindUniqueArgs} args - Arguments to find a Outcome
     * @example
     * // Get one Outcome
     * const outcome = await prisma.outcome.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutcomeFindUniqueArgs>(args: SelectSubset<T, OutcomeFindUniqueArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outcome that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutcomeFindUniqueOrThrowArgs} args - Arguments to find a Outcome
     * @example
     * // Get one Outcome
     * const outcome = await prisma.outcome.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutcomeFindUniqueOrThrowArgs>(args: SelectSubset<T, OutcomeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outcome that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeFindFirstArgs} args - Arguments to find a Outcome
     * @example
     * // Get one Outcome
     * const outcome = await prisma.outcome.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutcomeFindFirstArgs>(args?: SelectSubset<T, OutcomeFindFirstArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outcome that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeFindFirstOrThrowArgs} args - Arguments to find a Outcome
     * @example
     * // Get one Outcome
     * const outcome = await prisma.outcome.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutcomeFindFirstOrThrowArgs>(args?: SelectSubset<T, OutcomeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outcomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outcomes
     * const outcomes = await prisma.outcome.findMany()
     * 
     * // Get first 10 Outcomes
     * const outcomes = await prisma.outcome.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outcomeWithIdOnly = await prisma.outcome.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutcomeFindManyArgs>(args?: SelectSubset<T, OutcomeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outcome.
     * @param {OutcomeCreateArgs} args - Arguments to create a Outcome.
     * @example
     * // Create one Outcome
     * const Outcome = await prisma.outcome.create({
     *   data: {
     *     // ... data to create a Outcome
     *   }
     * })
     * 
     */
    create<T extends OutcomeCreateArgs>(args: SelectSubset<T, OutcomeCreateArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outcomes.
     * @param {OutcomeCreateManyArgs} args - Arguments to create many Outcomes.
     * @example
     * // Create many Outcomes
     * const outcome = await prisma.outcome.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutcomeCreateManyArgs>(args?: SelectSubset<T, OutcomeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outcomes and returns the data saved in the database.
     * @param {OutcomeCreateManyAndReturnArgs} args - Arguments to create many Outcomes.
     * @example
     * // Create many Outcomes
     * const outcome = await prisma.outcome.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outcomes and only return the `id`
     * const outcomeWithIdOnly = await prisma.outcome.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutcomeCreateManyAndReturnArgs>(args?: SelectSubset<T, OutcomeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Outcome.
     * @param {OutcomeDeleteArgs} args - Arguments to delete one Outcome.
     * @example
     * // Delete one Outcome
     * const Outcome = await prisma.outcome.delete({
     *   where: {
     *     // ... filter to delete one Outcome
     *   }
     * })
     * 
     */
    delete<T extends OutcomeDeleteArgs>(args: SelectSubset<T, OutcomeDeleteArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outcome.
     * @param {OutcomeUpdateArgs} args - Arguments to update one Outcome.
     * @example
     * // Update one Outcome
     * const outcome = await prisma.outcome.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutcomeUpdateArgs>(args: SelectSubset<T, OutcomeUpdateArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outcomes.
     * @param {OutcomeDeleteManyArgs} args - Arguments to filter Outcomes to delete.
     * @example
     * // Delete a few Outcomes
     * const { count } = await prisma.outcome.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutcomeDeleteManyArgs>(args?: SelectSubset<T, OutcomeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outcomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outcomes
     * const outcome = await prisma.outcome.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutcomeUpdateManyArgs>(args: SelectSubset<T, OutcomeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outcomes and returns the data updated in the database.
     * @param {OutcomeUpdateManyAndReturnArgs} args - Arguments to update many Outcomes.
     * @example
     * // Update many Outcomes
     * const outcome = await prisma.outcome.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Outcomes and only return the `id`
     * const outcomeWithIdOnly = await prisma.outcome.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutcomeUpdateManyAndReturnArgs>(args: SelectSubset<T, OutcomeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Outcome.
     * @param {OutcomeUpsertArgs} args - Arguments to update or create a Outcome.
     * @example
     * // Update or create a Outcome
     * const outcome = await prisma.outcome.upsert({
     *   create: {
     *     // ... data to create a Outcome
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outcome we want to update
     *   }
     * })
     */
    upsert<T extends OutcomeUpsertArgs>(args: SelectSubset<T, OutcomeUpsertArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outcomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeCountArgs} args - Arguments to filter Outcomes to count.
     * @example
     * // Count the number of Outcomes
     * const count = await prisma.outcome.count({
     *   where: {
     *     // ... the filter for the Outcomes we want to count
     *   }
     * })
    **/
    count<T extends OutcomeCountArgs>(
      args?: Subset<T, OutcomeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutcomeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outcome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutcomeAggregateArgs>(args: Subset<T, OutcomeAggregateArgs>): Prisma.PrismaPromise<GetOutcomeAggregateType<T>>

    /**
     * Group by Outcome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutcomeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutcomeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutcomeGroupByArgs['orderBy'] }
        : { orderBy?: OutcomeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutcomeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutcomeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outcome model
   */
  readonly fields: OutcomeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outcome.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutcomeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tokenAllocations<T extends Outcome$tokenAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, Outcome$tokenAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trades<T extends Outcome$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Outcome$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outcome model
   */
  interface OutcomeFieldRefs {
    readonly id: FieldRef<"Outcome", 'Int'>
    readonly outcome_title: FieldRef<"Outcome", 'String'>
    readonly current_supply: FieldRef<"Outcome", 'Decimal'>
    readonly total_liquidity: FieldRef<"Outcome", 'Decimal'>
    readonly marketID: FieldRef<"Outcome", 'Int'>
    readonly createdAt: FieldRef<"Outcome", 'DateTime'>
    readonly updatedAt: FieldRef<"Outcome", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Outcome findUnique
   */
  export type OutcomeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter, which Outcome to fetch.
     */
    where: OutcomeWhereUniqueInput
  }

  /**
   * Outcome findUniqueOrThrow
   */
  export type OutcomeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter, which Outcome to fetch.
     */
    where: OutcomeWhereUniqueInput
  }

  /**
   * Outcome findFirst
   */
  export type OutcomeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter, which Outcome to fetch.
     */
    where?: OutcomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outcomes to fetch.
     */
    orderBy?: OutcomeOrderByWithRelationInput | OutcomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outcomes.
     */
    cursor?: OutcomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outcomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outcomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outcomes.
     */
    distinct?: OutcomeScalarFieldEnum | OutcomeScalarFieldEnum[]
  }

  /**
   * Outcome findFirstOrThrow
   */
  export type OutcomeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter, which Outcome to fetch.
     */
    where?: OutcomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outcomes to fetch.
     */
    orderBy?: OutcomeOrderByWithRelationInput | OutcomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outcomes.
     */
    cursor?: OutcomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outcomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outcomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outcomes.
     */
    distinct?: OutcomeScalarFieldEnum | OutcomeScalarFieldEnum[]
  }

  /**
   * Outcome findMany
   */
  export type OutcomeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter, which Outcomes to fetch.
     */
    where?: OutcomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outcomes to fetch.
     */
    orderBy?: OutcomeOrderByWithRelationInput | OutcomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outcomes.
     */
    cursor?: OutcomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outcomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outcomes.
     */
    skip?: number
    distinct?: OutcomeScalarFieldEnum | OutcomeScalarFieldEnum[]
  }

  /**
   * Outcome create
   */
  export type OutcomeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * The data needed to create a Outcome.
     */
    data: XOR<OutcomeCreateInput, OutcomeUncheckedCreateInput>
  }

  /**
   * Outcome createMany
   */
  export type OutcomeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outcomes.
     */
    data: OutcomeCreateManyInput | OutcomeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outcome createManyAndReturn
   */
  export type OutcomeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * The data used to create many Outcomes.
     */
    data: OutcomeCreateManyInput | OutcomeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outcome update
   */
  export type OutcomeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * The data needed to update a Outcome.
     */
    data: XOR<OutcomeUpdateInput, OutcomeUncheckedUpdateInput>
    /**
     * Choose, which Outcome to update.
     */
    where: OutcomeWhereUniqueInput
  }

  /**
   * Outcome updateMany
   */
  export type OutcomeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outcomes.
     */
    data: XOR<OutcomeUpdateManyMutationInput, OutcomeUncheckedUpdateManyInput>
    /**
     * Filter which Outcomes to update
     */
    where?: OutcomeWhereInput
    /**
     * Limit how many Outcomes to update.
     */
    limit?: number
  }

  /**
   * Outcome updateManyAndReturn
   */
  export type OutcomeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * The data used to update Outcomes.
     */
    data: XOR<OutcomeUpdateManyMutationInput, OutcomeUncheckedUpdateManyInput>
    /**
     * Filter which Outcomes to update
     */
    where?: OutcomeWhereInput
    /**
     * Limit how many Outcomes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outcome upsert
   */
  export type OutcomeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * The filter to search for the Outcome to update in case it exists.
     */
    where: OutcomeWhereUniqueInput
    /**
     * In case the Outcome found by the `where` argument doesn't exist, create a new Outcome with this data.
     */
    create: XOR<OutcomeCreateInput, OutcomeUncheckedCreateInput>
    /**
     * In case the Outcome was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutcomeUpdateInput, OutcomeUncheckedUpdateInput>
  }

  /**
   * Outcome delete
   */
  export type OutcomeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    /**
     * Filter which Outcome to delete.
     */
    where: OutcomeWhereUniqueInput
  }

  /**
   * Outcome deleteMany
   */
  export type OutcomeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outcomes to delete
     */
    where?: OutcomeWhereInput
    /**
     * Limit how many Outcomes to delete.
     */
    limit?: number
  }

  /**
   * Outcome.tokenAllocations
   */
  export type Outcome$tokenAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    where?: TokenAllocationWhereInput
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    cursor?: TokenAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenAllocationScalarFieldEnum | TokenAllocationScalarFieldEnum[]
  }

  /**
   * Outcome.trades
   */
  export type Outcome$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Outcome without action
   */
  export type OutcomeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
  }


  /**
   * Model TokenAllocation
   */

  export type AggregateTokenAllocation = {
    _count: TokenAllocationCountAggregateOutputType | null
    _avg: TokenAllocationAvgAggregateOutputType | null
    _sum: TokenAllocationSumAggregateOutputType | null
    _min: TokenAllocationMinAggregateOutputType | null
    _max: TokenAllocationMaxAggregateOutputType | null
  }

  export type TokenAllocationAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userId: number | null
    outcomeId: number | null
  }

  export type TokenAllocationSumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userId: number | null
    outcomeId: number | null
  }

  export type TokenAllocationMinAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userId: number | null
    outcomeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenAllocationMaxAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userId: number | null
    outcomeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenAllocationCountAggregateOutputType = {
    id: number
    amount: number
    userId: number
    outcomeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenAllocationAvgAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    outcomeId?: true
  }

  export type TokenAllocationSumAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    outcomeId?: true
  }

  export type TokenAllocationMinAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    outcomeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenAllocationMaxAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    outcomeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenAllocationCountAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    outcomeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenAllocation to aggregate.
     */
    where?: TokenAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenAllocations to fetch.
     */
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenAllocations
    **/
    _count?: true | TokenAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenAllocationMaxAggregateInputType
  }

  export type GetTokenAllocationAggregateType<T extends TokenAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenAllocation[P]>
      : GetScalarType<T[P], AggregateTokenAllocation[P]>
  }




  export type TokenAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenAllocationWhereInput
    orderBy?: TokenAllocationOrderByWithAggregationInput | TokenAllocationOrderByWithAggregationInput[]
    by: TokenAllocationScalarFieldEnum[] | TokenAllocationScalarFieldEnum
    having?: TokenAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenAllocationCountAggregateInputType | true
    _avg?: TokenAllocationAvgAggregateInputType
    _sum?: TokenAllocationSumAggregateInputType
    _min?: TokenAllocationMinAggregateInputType
    _max?: TokenAllocationMaxAggregateInputType
  }

  export type TokenAllocationGroupByOutputType = {
    id: number
    amount: Decimal
    userId: number
    outcomeId: number
    createdAt: Date
    updatedAt: Date
    _count: TokenAllocationCountAggregateOutputType | null
    _avg: TokenAllocationAvgAggregateOutputType | null
    _sum: TokenAllocationSumAggregateOutputType | null
    _min: TokenAllocationMinAggregateOutputType | null
    _max: TokenAllocationMaxAggregateOutputType | null
  }

  type GetTokenAllocationGroupByPayload<T extends TokenAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], TokenAllocationGroupByOutputType[P]>
        }
      >
    >


  export type TokenAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    outcomeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenAllocation"]>

  export type TokenAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    outcomeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenAllocation"]>

  export type TokenAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    outcomeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenAllocation"]>

  export type TokenAllocationSelectScalar = {
    id?: boolean
    amount?: boolean
    userId?: boolean
    outcomeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "userId" | "outcomeId" | "createdAt" | "updatedAt", ExtArgs["result"]["tokenAllocation"]>
  export type TokenAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }
  export type TokenAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }
  export type TokenAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    outcome?: boolean | OutcomeDefaultArgs<ExtArgs>
  }

  export type $TokenAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenAllocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      outcome: Prisma.$OutcomePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: Prisma.Decimal
      userId: number
      outcomeId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tokenAllocation"]>
    composites: {}
  }

  type TokenAllocationGetPayload<S extends boolean | null | undefined | TokenAllocationDefaultArgs> = $Result.GetResult<Prisma.$TokenAllocationPayload, S>

  type TokenAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenAllocationCountAggregateInputType | true
    }

  export interface TokenAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenAllocation'], meta: { name: 'TokenAllocation' } }
    /**
     * Find zero or one TokenAllocation that matches the filter.
     * @param {TokenAllocationFindUniqueArgs} args - Arguments to find a TokenAllocation
     * @example
     * // Get one TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenAllocationFindUniqueArgs>(args: SelectSubset<T, TokenAllocationFindUniqueArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenAllocationFindUniqueOrThrowArgs} args - Arguments to find a TokenAllocation
     * @example
     * // Get one TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationFindFirstArgs} args - Arguments to find a TokenAllocation
     * @example
     * // Get one TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenAllocationFindFirstArgs>(args?: SelectSubset<T, TokenAllocationFindFirstArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationFindFirstOrThrowArgs} args - Arguments to find a TokenAllocation
     * @example
     * // Get one TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenAllocations
     * const tokenAllocations = await prisma.tokenAllocation.findMany()
     * 
     * // Get first 10 TokenAllocations
     * const tokenAllocations = await prisma.tokenAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenAllocationWithIdOnly = await prisma.tokenAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenAllocationFindManyArgs>(args?: SelectSubset<T, TokenAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenAllocation.
     * @param {TokenAllocationCreateArgs} args - Arguments to create a TokenAllocation.
     * @example
     * // Create one TokenAllocation
     * const TokenAllocation = await prisma.tokenAllocation.create({
     *   data: {
     *     // ... data to create a TokenAllocation
     *   }
     * })
     * 
     */
    create<T extends TokenAllocationCreateArgs>(args: SelectSubset<T, TokenAllocationCreateArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenAllocations.
     * @param {TokenAllocationCreateManyArgs} args - Arguments to create many TokenAllocations.
     * @example
     * // Create many TokenAllocations
     * const tokenAllocation = await prisma.tokenAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenAllocationCreateManyArgs>(args?: SelectSubset<T, TokenAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenAllocations and returns the data saved in the database.
     * @param {TokenAllocationCreateManyAndReturnArgs} args - Arguments to create many TokenAllocations.
     * @example
     * // Create many TokenAllocations
     * const tokenAllocation = await prisma.tokenAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenAllocations and only return the `id`
     * const tokenAllocationWithIdOnly = await prisma.tokenAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenAllocation.
     * @param {TokenAllocationDeleteArgs} args - Arguments to delete one TokenAllocation.
     * @example
     * // Delete one TokenAllocation
     * const TokenAllocation = await prisma.tokenAllocation.delete({
     *   where: {
     *     // ... filter to delete one TokenAllocation
     *   }
     * })
     * 
     */
    delete<T extends TokenAllocationDeleteArgs>(args: SelectSubset<T, TokenAllocationDeleteArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenAllocation.
     * @param {TokenAllocationUpdateArgs} args - Arguments to update one TokenAllocation.
     * @example
     * // Update one TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenAllocationUpdateArgs>(args: SelectSubset<T, TokenAllocationUpdateArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenAllocations.
     * @param {TokenAllocationDeleteManyArgs} args - Arguments to filter TokenAllocations to delete.
     * @example
     * // Delete a few TokenAllocations
     * const { count } = await prisma.tokenAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenAllocationDeleteManyArgs>(args?: SelectSubset<T, TokenAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenAllocations
     * const tokenAllocation = await prisma.tokenAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenAllocationUpdateManyArgs>(args: SelectSubset<T, TokenAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenAllocations and returns the data updated in the database.
     * @param {TokenAllocationUpdateManyAndReturnArgs} args - Arguments to update many TokenAllocations.
     * @example
     * // Update many TokenAllocations
     * const tokenAllocation = await prisma.tokenAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenAllocations and only return the `id`
     * const tokenAllocationWithIdOnly = await prisma.tokenAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenAllocation.
     * @param {TokenAllocationUpsertArgs} args - Arguments to update or create a TokenAllocation.
     * @example
     * // Update or create a TokenAllocation
     * const tokenAllocation = await prisma.tokenAllocation.upsert({
     *   create: {
     *     // ... data to create a TokenAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenAllocation we want to update
     *   }
     * })
     */
    upsert<T extends TokenAllocationUpsertArgs>(args: SelectSubset<T, TokenAllocationUpsertArgs<ExtArgs>>): Prisma__TokenAllocationClient<$Result.GetResult<Prisma.$TokenAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationCountArgs} args - Arguments to filter TokenAllocations to count.
     * @example
     * // Count the number of TokenAllocations
     * const count = await prisma.tokenAllocation.count({
     *   where: {
     *     // ... the filter for the TokenAllocations we want to count
     *   }
     * })
    **/
    count<T extends TokenAllocationCountArgs>(
      args?: Subset<T, TokenAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAllocationAggregateArgs>(args: Subset<T, TokenAllocationAggregateArgs>): Prisma.PrismaPromise<GetTokenAllocationAggregateType<T>>

    /**
     * Group by TokenAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenAllocationGroupByArgs['orderBy'] }
        : { orderBy?: TokenAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenAllocation model
   */
  readonly fields: TokenAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    outcome<T extends OutcomeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutcomeDefaultArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenAllocation model
   */
  interface TokenAllocationFieldRefs {
    readonly id: FieldRef<"TokenAllocation", 'Int'>
    readonly amount: FieldRef<"TokenAllocation", 'Decimal'>
    readonly userId: FieldRef<"TokenAllocation", 'Int'>
    readonly outcomeId: FieldRef<"TokenAllocation", 'Int'>
    readonly createdAt: FieldRef<"TokenAllocation", 'DateTime'>
    readonly updatedAt: FieldRef<"TokenAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenAllocation findUnique
   */
  export type TokenAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter, which TokenAllocation to fetch.
     */
    where: TokenAllocationWhereUniqueInput
  }

  /**
   * TokenAllocation findUniqueOrThrow
   */
  export type TokenAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter, which TokenAllocation to fetch.
     */
    where: TokenAllocationWhereUniqueInput
  }

  /**
   * TokenAllocation findFirst
   */
  export type TokenAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter, which TokenAllocation to fetch.
     */
    where?: TokenAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenAllocations to fetch.
     */
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenAllocations.
     */
    cursor?: TokenAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenAllocations.
     */
    distinct?: TokenAllocationScalarFieldEnum | TokenAllocationScalarFieldEnum[]
  }

  /**
   * TokenAllocation findFirstOrThrow
   */
  export type TokenAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter, which TokenAllocation to fetch.
     */
    where?: TokenAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenAllocations to fetch.
     */
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenAllocations.
     */
    cursor?: TokenAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenAllocations.
     */
    distinct?: TokenAllocationScalarFieldEnum | TokenAllocationScalarFieldEnum[]
  }

  /**
   * TokenAllocation findMany
   */
  export type TokenAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter, which TokenAllocations to fetch.
     */
    where?: TokenAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenAllocations to fetch.
     */
    orderBy?: TokenAllocationOrderByWithRelationInput | TokenAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenAllocations.
     */
    cursor?: TokenAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenAllocations.
     */
    skip?: number
    distinct?: TokenAllocationScalarFieldEnum | TokenAllocationScalarFieldEnum[]
  }

  /**
   * TokenAllocation create
   */
  export type TokenAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenAllocation.
     */
    data: XOR<TokenAllocationCreateInput, TokenAllocationUncheckedCreateInput>
  }

  /**
   * TokenAllocation createMany
   */
  export type TokenAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenAllocations.
     */
    data: TokenAllocationCreateManyInput | TokenAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenAllocation createManyAndReturn
   */
  export type TokenAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many TokenAllocations.
     */
    data: TokenAllocationCreateManyInput | TokenAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenAllocation update
   */
  export type TokenAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenAllocation.
     */
    data: XOR<TokenAllocationUpdateInput, TokenAllocationUncheckedUpdateInput>
    /**
     * Choose, which TokenAllocation to update.
     */
    where: TokenAllocationWhereUniqueInput
  }

  /**
   * TokenAllocation updateMany
   */
  export type TokenAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenAllocations.
     */
    data: XOR<TokenAllocationUpdateManyMutationInput, TokenAllocationUncheckedUpdateManyInput>
    /**
     * Filter which TokenAllocations to update
     */
    where?: TokenAllocationWhereInput
    /**
     * Limit how many TokenAllocations to update.
     */
    limit?: number
  }

  /**
   * TokenAllocation updateManyAndReturn
   */
  export type TokenAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * The data used to update TokenAllocations.
     */
    data: XOR<TokenAllocationUpdateManyMutationInput, TokenAllocationUncheckedUpdateManyInput>
    /**
     * Filter which TokenAllocations to update
     */
    where?: TokenAllocationWhereInput
    /**
     * Limit how many TokenAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenAllocation upsert
   */
  export type TokenAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenAllocation to update in case it exists.
     */
    where: TokenAllocationWhereUniqueInput
    /**
     * In case the TokenAllocation found by the `where` argument doesn't exist, create a new TokenAllocation with this data.
     */
    create: XOR<TokenAllocationCreateInput, TokenAllocationUncheckedCreateInput>
    /**
     * In case the TokenAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenAllocationUpdateInput, TokenAllocationUncheckedUpdateInput>
  }

  /**
   * TokenAllocation delete
   */
  export type TokenAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
    /**
     * Filter which TokenAllocation to delete.
     */
    where: TokenAllocationWhereUniqueInput
  }

  /**
   * TokenAllocation deleteMany
   */
  export type TokenAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenAllocations to delete
     */
    where?: TokenAllocationWhereInput
    /**
     * Limit how many TokenAllocations to delete.
     */
    limit?: number
  }

  /**
   * TokenAllocation without action
   */
  export type TokenAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenAllocation
     */
    select?: TokenAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenAllocation
     */
    omit?: TokenAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenAllocationInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    id: number | null
    order_size: Decimal | null
    amount: Decimal | null
    afterPrice: Decimal | null
    marketID: number | null
    outcomeId: number | null
    userID: number | null
  }

  export type TradeSumAggregateOutputType = {
    id: number | null
    order_size: Decimal | null
    amount: Decimal | null
    afterPrice: Decimal | null
    marketID: number | null
    outcomeId: number | null
    userID: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: number | null
    unique_id: string | null
    order_type: $Enums.OrderType | null
    order_size: Decimal | null
    amount: Decimal | null
    afterPrice: Decimal | null
    marketID: number | null
    outcomeId: number | null
    userID: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: number | null
    unique_id: string | null
    order_type: $Enums.OrderType | null
    order_size: Decimal | null
    amount: Decimal | null
    afterPrice: Decimal | null
    marketID: number | null
    outcomeId: number | null
    userID: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    unique_id: number
    order_type: number
    order_size: number
    amount: number
    afterPrice: number
    marketID: number
    outcomeId: number
    userID: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    id?: true
    order_size?: true
    amount?: true
    afterPrice?: true
    marketID?: true
    outcomeId?: true
    userID?: true
  }

  export type TradeSumAggregateInputType = {
    id?: true
    order_size?: true
    amount?: true
    afterPrice?: true
    marketID?: true
    outcomeId?: true
    userID?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    unique_id?: true
    order_type?: true
    order_size?: true
    amount?: true
    afterPrice?: true
    marketID?: true
    outcomeId?: true
    userID?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    unique_id?: true
    order_type?: true
    order_size?: true
    amount?: true
    afterPrice?: true
    marketID?: true
    outcomeId?: true
    userID?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    unique_id?: true
    order_type?: true
    order_size?: true
    amount?: true
    afterPrice?: true
    marketID?: true
    outcomeId?: true
    userID?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: number
    unique_id: string
    order_type: $Enums.OrderType
    order_size: Decimal
    amount: Decimal
    afterPrice: Decimal
    marketID: number | null
    outcomeId: number | null
    userID: number | null
    createdAt: Date
    updatedAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unique_id?: boolean
    order_type?: boolean
    order_size?: boolean
    amount?: boolean
    afterPrice?: boolean
    marketID?: boolean
    outcomeId?: boolean
    userID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unique_id?: boolean
    order_type?: boolean
    order_size?: boolean
    amount?: boolean
    afterPrice?: boolean
    marketID?: boolean
    outcomeId?: boolean
    userID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unique_id?: boolean
    order_type?: boolean
    order_size?: boolean
    amount?: boolean
    afterPrice?: boolean
    marketID?: boolean
    outcomeId?: boolean
    userID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    unique_id?: boolean
    order_type?: boolean
    order_size?: boolean
    amount?: boolean
    afterPrice?: boolean
    marketID?: boolean
    outcomeId?: boolean
    userID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "unique_id" | "order_type" | "order_size" | "amount" | "afterPrice" | "marketID" | "outcomeId" | "userID" | "createdAt" | "updatedAt", ExtArgs["result"]["trade"]>
  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }
  export type TradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | Trade$marketArgs<ExtArgs>
    outcome?: boolean | Trade$outcomeArgs<ExtArgs>
    user?: boolean | Trade$userArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      market: Prisma.$MarketPayload<ExtArgs> | null
      outcome: Prisma.$OutcomePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      unique_id: string
      order_type: $Enums.OrderType
      order_size: Prisma.Decimal
      amount: Prisma.Decimal
      afterPrice: Prisma.Decimal
      marketID: number | null
      outcomeId: number | null
      userID: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    market<T extends Trade$marketArgs<ExtArgs> = {}>(args?: Subset<T, Trade$marketArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    outcome<T extends Trade$outcomeArgs<ExtArgs> = {}>(args?: Subset<T, Trade$outcomeArgs<ExtArgs>>): Prisma__OutcomeClient<$Result.GetResult<Prisma.$OutcomePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends Trade$userArgs<ExtArgs> = {}>(args?: Subset<T, Trade$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'Int'>
    readonly unique_id: FieldRef<"Trade", 'String'>
    readonly order_type: FieldRef<"Trade", 'OrderType'>
    readonly order_size: FieldRef<"Trade", 'Decimal'>
    readonly amount: FieldRef<"Trade", 'Decimal'>
    readonly afterPrice: FieldRef<"Trade", 'Decimal'>
    readonly marketID: FieldRef<"Trade", 'Int'>
    readonly outcomeId: FieldRef<"Trade", 'Int'>
    readonly userID: FieldRef<"Trade", 'Int'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
    readonly updatedAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade.market
   */
  export type Trade$marketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    where?: MarketWhereInput
  }

  /**
   * Trade.outcome
   */
  export type Trade$outcomeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outcome
     */
    select?: OutcomeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outcome
     */
    omit?: OutcomeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutcomeInclude<ExtArgs> | null
    where?: OutcomeWhereInput
  }

  /**
   * Trade.user
   */
  export type Trade$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    about: 'about',
    wallet_address: 'wallet_address',
    role: 'role',
    profile_pic: 'profile_pic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MarketScalarFieldEnum: {
    id: 'id',
    description: 'description',
    resolution_criteria: 'resolution_criteria',
    question: 'question',
    expiry_date: 'expiry_date',
    image: 'image',
    tags: 'tags',
    status: 'status',
    outcomeWon: 'outcomeWon',
    creatorId: 'creatorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarketScalarFieldEnum = (typeof MarketScalarFieldEnum)[keyof typeof MarketScalarFieldEnum]


  export const OutcomeScalarFieldEnum: {
    id: 'id',
    outcome_title: 'outcome_title',
    current_supply: 'current_supply',
    total_liquidity: 'total_liquidity',
    marketID: 'marketID',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OutcomeScalarFieldEnum = (typeof OutcomeScalarFieldEnum)[keyof typeof OutcomeScalarFieldEnum]


  export const TokenAllocationScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    userId: 'userId',
    outcomeId: 'outcomeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenAllocationScalarFieldEnum = (typeof TokenAllocationScalarFieldEnum)[keyof typeof TokenAllocationScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    unique_id: 'unique_id',
    order_type: 'order_type',
    order_size: 'order_size',
    amount: 'amount',
    afterPrice: 'afterPrice',
    marketID: 'marketID',
    outcomeId: 'outcomeId',
    userID: 'userID',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'OrderType'
   */
  export type EnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType'>
    


  /**
   * Reference to a field of type 'OrderType[]'
   */
  export type ListEnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    about?: StringFilter<"User"> | string
    wallet_address?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    profile_pic?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    markets?: MarketListRelationFilter
    trades?: TradeListRelationFilter
    token_allocated?: TokenAllocationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    about?: SortOrder
    wallet_address?: SortOrder
    role?: SortOrder
    profile_pic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    markets?: MarketOrderByRelationAggregateInput
    trades?: TradeOrderByRelationAggregateInput
    token_allocated?: TokenAllocationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    wallet_address?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    about?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    profile_pic?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    markets?: MarketListRelationFilter
    trades?: TradeListRelationFilter
    token_allocated?: TokenAllocationListRelationFilter
  }, "id" | "username" | "wallet_address">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    about?: SortOrder
    wallet_address?: SortOrder
    role?: SortOrder
    profile_pic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    about?: StringWithAggregatesFilter<"User"> | string
    wallet_address?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    profile_pic?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MarketWhereInput = {
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    id?: IntFilter<"Market"> | number
    description?: StringFilter<"Market"> | string
    resolution_criteria?: StringFilter<"Market"> | string
    question?: StringFilter<"Market"> | string
    expiry_date?: DateTimeFilter<"Market"> | Date | string
    image?: StringNullableFilter<"Market"> | string | null
    tags?: StringNullableListFilter<"Market">
    status?: EnumEventStatusFilter<"Market"> | $Enums.EventStatus
    outcomeWon?: IntNullableFilter<"Market"> | number | null
    creatorId?: IntFilter<"Market"> | number
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    trades?: TradeListRelationFilter
    outcome?: OutcomeListRelationFilter
  }

  export type MarketOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    resolution_criteria?: SortOrder
    question?: SortOrder
    expiry_date?: SortOrder
    image?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    outcomeWon?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    trades?: TradeOrderByRelationAggregateInput
    outcome?: OutcomeOrderByRelationAggregateInput
  }

  export type MarketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    description?: StringFilter<"Market"> | string
    resolution_criteria?: StringFilter<"Market"> | string
    question?: StringFilter<"Market"> | string
    expiry_date?: DateTimeFilter<"Market"> | Date | string
    image?: StringNullableFilter<"Market"> | string | null
    tags?: StringNullableListFilter<"Market">
    status?: EnumEventStatusFilter<"Market"> | $Enums.EventStatus
    outcomeWon?: IntNullableFilter<"Market"> | number | null
    creatorId?: IntFilter<"Market"> | number
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    trades?: TradeListRelationFilter
    outcome?: OutcomeListRelationFilter
  }, "id">

  export type MarketOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    resolution_criteria?: SortOrder
    question?: SortOrder
    expiry_date?: SortOrder
    image?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    outcomeWon?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketCountOrderByAggregateInput
    _avg?: MarketAvgOrderByAggregateInput
    _max?: MarketMaxOrderByAggregateInput
    _min?: MarketMinOrderByAggregateInput
    _sum?: MarketSumOrderByAggregateInput
  }

  export type MarketScalarWhereWithAggregatesInput = {
    AND?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    OR?: MarketScalarWhereWithAggregatesInput[]
    NOT?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Market"> | number
    description?: StringWithAggregatesFilter<"Market"> | string
    resolution_criteria?: StringWithAggregatesFilter<"Market"> | string
    question?: StringWithAggregatesFilter<"Market"> | string
    expiry_date?: DateTimeWithAggregatesFilter<"Market"> | Date | string
    image?: StringNullableWithAggregatesFilter<"Market"> | string | null
    tags?: StringNullableListFilter<"Market">
    status?: EnumEventStatusWithAggregatesFilter<"Market"> | $Enums.EventStatus
    outcomeWon?: IntNullableWithAggregatesFilter<"Market"> | number | null
    creatorId?: IntWithAggregatesFilter<"Market"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
  }

  export type OutcomeWhereInput = {
    AND?: OutcomeWhereInput | OutcomeWhereInput[]
    OR?: OutcomeWhereInput[]
    NOT?: OutcomeWhereInput | OutcomeWhereInput[]
    id?: IntFilter<"Outcome"> | number
    outcome_title?: StringFilter<"Outcome"> | string
    current_supply?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    marketID?: IntFilter<"Outcome"> | number
    createdAt?: DateTimeFilter<"Outcome"> | Date | string
    updatedAt?: DateTimeFilter<"Outcome"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    tokenAllocations?: TokenAllocationListRelationFilter
    trades?: TradeListRelationFilter
  }

  export type OutcomeOrderByWithRelationInput = {
    id?: SortOrder
    outcome_title?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    market?: MarketOrderByWithRelationInput
    tokenAllocations?: TokenAllocationOrderByRelationAggregateInput
    trades?: TradeOrderByRelationAggregateInput
  }

  export type OutcomeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutcomeWhereInput | OutcomeWhereInput[]
    OR?: OutcomeWhereInput[]
    NOT?: OutcomeWhereInput | OutcomeWhereInput[]
    outcome_title?: StringFilter<"Outcome"> | string
    current_supply?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    marketID?: IntFilter<"Outcome"> | number
    createdAt?: DateTimeFilter<"Outcome"> | Date | string
    updatedAt?: DateTimeFilter<"Outcome"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    tokenAllocations?: TokenAllocationListRelationFilter
    trades?: TradeListRelationFilter
  }, "id">

  export type OutcomeOrderByWithAggregationInput = {
    id?: SortOrder
    outcome_title?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OutcomeCountOrderByAggregateInput
    _avg?: OutcomeAvgOrderByAggregateInput
    _max?: OutcomeMaxOrderByAggregateInput
    _min?: OutcomeMinOrderByAggregateInput
    _sum?: OutcomeSumOrderByAggregateInput
  }

  export type OutcomeScalarWhereWithAggregatesInput = {
    AND?: OutcomeScalarWhereWithAggregatesInput | OutcomeScalarWhereWithAggregatesInput[]
    OR?: OutcomeScalarWhereWithAggregatesInput[]
    NOT?: OutcomeScalarWhereWithAggregatesInput | OutcomeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Outcome"> | number
    outcome_title?: StringWithAggregatesFilter<"Outcome"> | string
    current_supply?: DecimalWithAggregatesFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalWithAggregatesFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    marketID?: IntWithAggregatesFilter<"Outcome"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Outcome"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Outcome"> | Date | string
  }

  export type TokenAllocationWhereInput = {
    AND?: TokenAllocationWhereInput | TokenAllocationWhereInput[]
    OR?: TokenAllocationWhereInput[]
    NOT?: TokenAllocationWhereInput | TokenAllocationWhereInput[]
    id?: IntFilter<"TokenAllocation"> | number
    amount?: DecimalFilter<"TokenAllocation"> | Decimal | DecimalJsLike | number | string
    userId?: IntFilter<"TokenAllocation"> | number
    outcomeId?: IntFilter<"TokenAllocation"> | number
    createdAt?: DateTimeFilter<"TokenAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"TokenAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    outcome?: XOR<OutcomeScalarRelationFilter, OutcomeWhereInput>
  }

  export type TokenAllocationOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    outcome?: OutcomeOrderByWithRelationInput
  }

  export type TokenAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_outcomeId?: TokenAllocationUserIdOutcomeIdCompoundUniqueInput
    AND?: TokenAllocationWhereInput | TokenAllocationWhereInput[]
    OR?: TokenAllocationWhereInput[]
    NOT?: TokenAllocationWhereInput | TokenAllocationWhereInput[]
    amount?: DecimalFilter<"TokenAllocation"> | Decimal | DecimalJsLike | number | string
    userId?: IntFilter<"TokenAllocation"> | number
    outcomeId?: IntFilter<"TokenAllocation"> | number
    createdAt?: DateTimeFilter<"TokenAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"TokenAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    outcome?: XOR<OutcomeScalarRelationFilter, OutcomeWhereInput>
  }, "id" | "userId_outcomeId">

  export type TokenAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenAllocationCountOrderByAggregateInput
    _avg?: TokenAllocationAvgOrderByAggregateInput
    _max?: TokenAllocationMaxOrderByAggregateInput
    _min?: TokenAllocationMinOrderByAggregateInput
    _sum?: TokenAllocationSumOrderByAggregateInput
  }

  export type TokenAllocationScalarWhereWithAggregatesInput = {
    AND?: TokenAllocationScalarWhereWithAggregatesInput | TokenAllocationScalarWhereWithAggregatesInput[]
    OR?: TokenAllocationScalarWhereWithAggregatesInput[]
    NOT?: TokenAllocationScalarWhereWithAggregatesInput | TokenAllocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TokenAllocation"> | number
    amount?: DecimalWithAggregatesFilter<"TokenAllocation"> | Decimal | DecimalJsLike | number | string
    userId?: IntWithAggregatesFilter<"TokenAllocation"> | number
    outcomeId?: IntWithAggregatesFilter<"TokenAllocation"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TokenAllocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TokenAllocation"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: IntFilter<"Trade"> | number
    unique_id?: StringFilter<"Trade"> | string
    order_type?: EnumOrderTypeFilter<"Trade"> | $Enums.OrderType
    order_size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    marketID?: IntNullableFilter<"Trade"> | number | null
    outcomeId?: IntNullableFilter<"Trade"> | number | null
    userID?: IntNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
    market?: XOR<MarketNullableScalarRelationFilter, MarketWhereInput> | null
    outcome?: XOR<OutcomeNullableScalarRelationFilter, OutcomeWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    unique_id?: SortOrder
    order_type?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrderInput | SortOrder
    outcomeId?: SortOrderInput | SortOrder
    userID?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    market?: MarketOrderByWithRelationInput
    outcome?: OutcomeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    unique_id?: StringFilter<"Trade"> | string
    order_type?: EnumOrderTypeFilter<"Trade"> | $Enums.OrderType
    order_size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    marketID?: IntNullableFilter<"Trade"> | number | null
    outcomeId?: IntNullableFilter<"Trade"> | number | null
    userID?: IntNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
    market?: XOR<MarketNullableScalarRelationFilter, MarketWhereInput> | null
    outcome?: XOR<OutcomeNullableScalarRelationFilter, OutcomeWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    unique_id?: SortOrder
    order_type?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrderInput | SortOrder
    outcomeId?: SortOrderInput | SortOrder
    userID?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Trade"> | number
    unique_id?: StringWithAggregatesFilter<"Trade"> | string
    order_type?: EnumOrderTypeWithAggregatesFilter<"Trade"> | $Enums.OrderType
    order_size?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    marketID?: IntNullableWithAggregatesFilter<"Trade"> | number | null
    outcomeId?: IntNullableWithAggregatesFilter<"Trade"> | number | null
    userID?: IntNullableWithAggregatesFilter<"Trade"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketCreateNestedManyWithoutCreatorInput
    trades?: TradeCreateNestedManyWithoutUserInput
    token_allocated?: TokenAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketUncheckedCreateNestedManyWithoutCreatorInput
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    token_allocated?: TokenAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUpdateManyWithoutCreatorNestedInput
    trades?: TradeUpdateManyWithoutUserNestedInput
    token_allocated?: TokenAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUncheckedUpdateManyWithoutCreatorNestedInput
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    token_allocated?: TokenAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketCreateInput = {
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutMarketsInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    outcome?: OutcomeCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    creatorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    outcome?: OutcomeUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutMarketsNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    outcome?: OutcomeUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    creatorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    outcome?: OutcomeUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type MarketCreateManyInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    creatorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    creatorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutcomeCreateInput = {
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market: MarketCreateNestedOneWithoutOutcomeInput
    tokenAllocations?: TokenAllocationCreateNestedManyWithoutOutcomeInput
    trades?: TradeCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeUncheckedCreateInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    marketID: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenAllocations?: TokenAllocationUncheckedCreateNestedManyWithoutOutcomeInput
    trades?: TradeUncheckedCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeUpdateInput = {
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutOutcomeNestedInput
    tokenAllocations?: TokenAllocationUpdateManyWithoutOutcomeNestedInput
    trades?: TradeUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenAllocations?: TokenAllocationUncheckedUpdateManyWithoutOutcomeNestedInput
    trades?: TradeUncheckedUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeCreateManyInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    marketID: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OutcomeUpdateManyMutationInput = {
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutcomeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutToken_allocatedInput
    outcome: OutcomeCreateNestedOneWithoutTokenAllocationsInput
  }

  export type TokenAllocationUncheckedCreateInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    userId: number
    outcomeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutToken_allocatedNestedInput
    outcome?: OutcomeUpdateOneRequiredWithoutTokenAllocationsNestedInput
  }

  export type TokenAllocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: IntFieldUpdateOperationsInput | number
    outcomeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationCreateManyInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    userId: number
    outcomeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: IntFieldUpdateOperationsInput | number
    outcomeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market?: MarketCreateNestedOneWithoutTradesInput
    outcome?: OutcomeCreateNestedOneWithoutTradesInput
    user?: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    outcomeId?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneWithoutTradesNestedInput
    outcome?: OutcomeUpdateOneWithoutTradesNestedInput
    user?: UserUpdateOneWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    outcomeId?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MarketListRelationFilter = {
    every?: MarketWhereInput
    some?: MarketWhereInput
    none?: MarketWhereInput
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type TokenAllocationListRelationFilter = {
    every?: TokenAllocationWhereInput
    some?: TokenAllocationWhereInput
    none?: TokenAllocationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MarketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    about?: SortOrder
    wallet_address?: SortOrder
    role?: SortOrder
    profile_pic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    about?: SortOrder
    wallet_address?: SortOrder
    role?: SortOrder
    profile_pic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    about?: SortOrder
    wallet_address?: SortOrder
    role?: SortOrder
    profile_pic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OutcomeListRelationFilter = {
    every?: OutcomeWhereInput
    some?: OutcomeWhereInput
    none?: OutcomeWhereInput
  }

  export type OutcomeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarketCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    resolution_criteria?: SortOrder
    question?: SortOrder
    expiry_date?: SortOrder
    image?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    outcomeWon?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketAvgOrderByAggregateInput = {
    id?: SortOrder
    outcomeWon?: SortOrder
    creatorId?: SortOrder
  }

  export type MarketMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    resolution_criteria?: SortOrder
    question?: SortOrder
    expiry_date?: SortOrder
    image?: SortOrder
    status?: SortOrder
    outcomeWon?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    resolution_criteria?: SortOrder
    question?: SortOrder
    expiry_date?: SortOrder
    image?: SortOrder
    status?: SortOrder
    outcomeWon?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketSumOrderByAggregateInput = {
    id?: SortOrder
    outcomeWon?: SortOrder
    creatorId?: SortOrder
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type MarketScalarRelationFilter = {
    is?: MarketWhereInput
    isNot?: MarketWhereInput
  }

  export type OutcomeCountOrderByAggregateInput = {
    id?: SortOrder
    outcome_title?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OutcomeAvgOrderByAggregateInput = {
    id?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
  }

  export type OutcomeMaxOrderByAggregateInput = {
    id?: SortOrder
    outcome_title?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OutcomeMinOrderByAggregateInput = {
    id?: SortOrder
    outcome_title?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OutcomeSumOrderByAggregateInput = {
    id?: SortOrder
    current_supply?: SortOrder
    total_liquidity?: SortOrder
    marketID?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type OutcomeScalarRelationFilter = {
    is?: OutcomeWhereInput
    isNot?: OutcomeWhereInput
  }

  export type TokenAllocationUserIdOutcomeIdCompoundUniqueInput = {
    userId: number
    outcomeId: number
  }

  export type TokenAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenAllocationAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
  }

  export type TokenAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenAllocationSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    outcomeId?: SortOrder
  }

  export type EnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type MarketNullableScalarRelationFilter = {
    is?: MarketWhereInput | null
    isNot?: MarketWhereInput | null
  }

  export type OutcomeNullableScalarRelationFilter = {
    is?: OutcomeWhereInput | null
    isNot?: OutcomeWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    unique_id?: SortOrder
    order_type?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrder
    outcomeId?: SortOrder
    userID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    id?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrder
    outcomeId?: SortOrder
    userID?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    unique_id?: SortOrder
    order_type?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrder
    outcomeId?: SortOrder
    userID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    unique_id?: SortOrder
    order_type?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrder
    outcomeId?: SortOrder
    userID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    id?: SortOrder
    order_size?: SortOrder
    amount?: SortOrder
    afterPrice?: SortOrder
    marketID?: SortOrder
    outcomeId?: SortOrder
    userID?: SortOrder
  }

  export type EnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type MarketCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput> | MarketCreateWithoutCreatorInput[] | MarketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MarketCreateOrConnectWithoutCreatorInput | MarketCreateOrConnectWithoutCreatorInput[]
    createMany?: MarketCreateManyCreatorInputEnvelope
    connect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TokenAllocationCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput> | TokenAllocationCreateWithoutUserInput[] | TokenAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutUserInput | TokenAllocationCreateOrConnectWithoutUserInput[]
    createMany?: TokenAllocationCreateManyUserInputEnvelope
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
  }

  export type MarketUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput> | MarketCreateWithoutCreatorInput[] | MarketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MarketCreateOrConnectWithoutCreatorInput | MarketCreateOrConnectWithoutCreatorInput[]
    createMany?: MarketCreateManyCreatorInputEnvelope
    connect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TokenAllocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput> | TokenAllocationCreateWithoutUserInput[] | TokenAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutUserInput | TokenAllocationCreateOrConnectWithoutUserInput[]
    createMany?: TokenAllocationCreateManyUserInputEnvelope
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MarketUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput> | MarketCreateWithoutCreatorInput[] | MarketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MarketCreateOrConnectWithoutCreatorInput | MarketCreateOrConnectWithoutCreatorInput[]
    upsert?: MarketUpsertWithWhereUniqueWithoutCreatorInput | MarketUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MarketCreateManyCreatorInputEnvelope
    set?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    disconnect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    delete?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    connect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    update?: MarketUpdateWithWhereUniqueWithoutCreatorInput | MarketUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MarketUpdateManyWithWhereWithoutCreatorInput | MarketUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MarketScalarWhereInput | MarketScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TokenAllocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput> | TokenAllocationCreateWithoutUserInput[] | TokenAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutUserInput | TokenAllocationCreateOrConnectWithoutUserInput[]
    upsert?: TokenAllocationUpsertWithWhereUniqueWithoutUserInput | TokenAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenAllocationCreateManyUserInputEnvelope
    set?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    disconnect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    delete?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    update?: TokenAllocationUpdateWithWhereUniqueWithoutUserInput | TokenAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenAllocationUpdateManyWithWhereWithoutUserInput | TokenAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MarketUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput> | MarketCreateWithoutCreatorInput[] | MarketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MarketCreateOrConnectWithoutCreatorInput | MarketCreateOrConnectWithoutCreatorInput[]
    upsert?: MarketUpsertWithWhereUniqueWithoutCreatorInput | MarketUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MarketCreateManyCreatorInputEnvelope
    set?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    disconnect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    delete?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    connect?: MarketWhereUniqueInput | MarketWhereUniqueInput[]
    update?: MarketUpdateWithWhereUniqueWithoutCreatorInput | MarketUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MarketUpdateManyWithWhereWithoutCreatorInput | MarketUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MarketScalarWhereInput | MarketScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TokenAllocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput> | TokenAllocationCreateWithoutUserInput[] | TokenAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutUserInput | TokenAllocationCreateOrConnectWithoutUserInput[]
    upsert?: TokenAllocationUpsertWithWhereUniqueWithoutUserInput | TokenAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenAllocationCreateManyUserInputEnvelope
    set?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    disconnect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    delete?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    update?: TokenAllocationUpdateWithWhereUniqueWithoutUserInput | TokenAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenAllocationUpdateManyWithWhereWithoutUserInput | TokenAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
  }

  export type MarketCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMarketsInput = {
    create?: XOR<UserCreateWithoutMarketsInput, UserUncheckedCreateWithoutMarketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMarketsInput
    connect?: UserWhereUniqueInput
  }

  export type TradeCreateNestedManyWithoutMarketInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type OutcomeCreateNestedManyWithoutMarketInput = {
    create?: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput> | OutcomeCreateWithoutMarketInput[] | OutcomeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OutcomeCreateOrConnectWithoutMarketInput | OutcomeCreateOrConnectWithoutMarketInput[]
    createMany?: OutcomeCreateManyMarketInputEnvelope
    connect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type OutcomeUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput> | OutcomeCreateWithoutMarketInput[] | OutcomeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OutcomeCreateOrConnectWithoutMarketInput | OutcomeCreateOrConnectWithoutMarketInput[]
    createMany?: OutcomeCreateManyMarketInputEnvelope
    connect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
  }

  export type MarketUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMarketsNestedInput = {
    create?: XOR<UserCreateWithoutMarketsInput, UserUncheckedCreateWithoutMarketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMarketsInput
    upsert?: UserUpsertWithoutMarketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMarketsInput, UserUpdateWithoutMarketsInput>, UserUncheckedUpdateWithoutMarketsInput>
  }

  export type TradeUpdateManyWithoutMarketNestedInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutMarketInput | TradeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutMarketInput | TradeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutMarketInput | TradeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type OutcomeUpdateManyWithoutMarketNestedInput = {
    create?: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput> | OutcomeCreateWithoutMarketInput[] | OutcomeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OutcomeCreateOrConnectWithoutMarketInput | OutcomeCreateOrConnectWithoutMarketInput[]
    upsert?: OutcomeUpsertWithWhereUniqueWithoutMarketInput | OutcomeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: OutcomeCreateManyMarketInputEnvelope
    set?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    disconnect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    delete?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    connect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    update?: OutcomeUpdateWithWhereUniqueWithoutMarketInput | OutcomeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: OutcomeUpdateManyWithWhereWithoutMarketInput | OutcomeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: OutcomeScalarWhereInput | OutcomeScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutMarketInput | TradeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutMarketInput | TradeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutMarketInput | TradeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type OutcomeUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput> | OutcomeCreateWithoutMarketInput[] | OutcomeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OutcomeCreateOrConnectWithoutMarketInput | OutcomeCreateOrConnectWithoutMarketInput[]
    upsert?: OutcomeUpsertWithWhereUniqueWithoutMarketInput | OutcomeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: OutcomeCreateManyMarketInputEnvelope
    set?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    disconnect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    delete?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    connect?: OutcomeWhereUniqueInput | OutcomeWhereUniqueInput[]
    update?: OutcomeUpdateWithWhereUniqueWithoutMarketInput | OutcomeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: OutcomeUpdateManyWithWhereWithoutMarketInput | OutcomeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: OutcomeScalarWhereInput | OutcomeScalarWhereInput[]
  }

  export type MarketCreateNestedOneWithoutOutcomeInput = {
    create?: XOR<MarketCreateWithoutOutcomeInput, MarketUncheckedCreateWithoutOutcomeInput>
    connectOrCreate?: MarketCreateOrConnectWithoutOutcomeInput
    connect?: MarketWhereUniqueInput
  }

  export type TokenAllocationCreateNestedManyWithoutOutcomeInput = {
    create?: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput> | TokenAllocationCreateWithoutOutcomeInput[] | TokenAllocationUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutOutcomeInput | TokenAllocationCreateOrConnectWithoutOutcomeInput[]
    createMany?: TokenAllocationCreateManyOutcomeInputEnvelope
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutOutcomeInput = {
    create?: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput> | TradeCreateWithoutOutcomeInput[] | TradeUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOutcomeInput | TradeCreateOrConnectWithoutOutcomeInput[]
    createMany?: TradeCreateManyOutcomeInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TokenAllocationUncheckedCreateNestedManyWithoutOutcomeInput = {
    create?: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput> | TokenAllocationCreateWithoutOutcomeInput[] | TokenAllocationUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutOutcomeInput | TokenAllocationCreateOrConnectWithoutOutcomeInput[]
    createMany?: TokenAllocationCreateManyOutcomeInputEnvelope
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutOutcomeInput = {
    create?: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput> | TradeCreateWithoutOutcomeInput[] | TradeUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOutcomeInput | TradeCreateOrConnectWithoutOutcomeInput[]
    createMany?: TradeCreateManyOutcomeInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type MarketUpdateOneRequiredWithoutOutcomeNestedInput = {
    create?: XOR<MarketCreateWithoutOutcomeInput, MarketUncheckedCreateWithoutOutcomeInput>
    connectOrCreate?: MarketCreateOrConnectWithoutOutcomeInput
    upsert?: MarketUpsertWithoutOutcomeInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutOutcomeInput, MarketUpdateWithoutOutcomeInput>, MarketUncheckedUpdateWithoutOutcomeInput>
  }

  export type TokenAllocationUpdateManyWithoutOutcomeNestedInput = {
    create?: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput> | TokenAllocationCreateWithoutOutcomeInput[] | TokenAllocationUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutOutcomeInput | TokenAllocationCreateOrConnectWithoutOutcomeInput[]
    upsert?: TokenAllocationUpsertWithWhereUniqueWithoutOutcomeInput | TokenAllocationUpsertWithWhereUniqueWithoutOutcomeInput[]
    createMany?: TokenAllocationCreateManyOutcomeInputEnvelope
    set?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    disconnect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    delete?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    update?: TokenAllocationUpdateWithWhereUniqueWithoutOutcomeInput | TokenAllocationUpdateWithWhereUniqueWithoutOutcomeInput[]
    updateMany?: TokenAllocationUpdateManyWithWhereWithoutOutcomeInput | TokenAllocationUpdateManyWithWhereWithoutOutcomeInput[]
    deleteMany?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutOutcomeNestedInput = {
    create?: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput> | TradeCreateWithoutOutcomeInput[] | TradeUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOutcomeInput | TradeCreateOrConnectWithoutOutcomeInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutOutcomeInput | TradeUpsertWithWhereUniqueWithoutOutcomeInput[]
    createMany?: TradeCreateManyOutcomeInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutOutcomeInput | TradeUpdateWithWhereUniqueWithoutOutcomeInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutOutcomeInput | TradeUpdateManyWithWhereWithoutOutcomeInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TokenAllocationUncheckedUpdateManyWithoutOutcomeNestedInput = {
    create?: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput> | TokenAllocationCreateWithoutOutcomeInput[] | TokenAllocationUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TokenAllocationCreateOrConnectWithoutOutcomeInput | TokenAllocationCreateOrConnectWithoutOutcomeInput[]
    upsert?: TokenAllocationUpsertWithWhereUniqueWithoutOutcomeInput | TokenAllocationUpsertWithWhereUniqueWithoutOutcomeInput[]
    createMany?: TokenAllocationCreateManyOutcomeInputEnvelope
    set?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    disconnect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    delete?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    connect?: TokenAllocationWhereUniqueInput | TokenAllocationWhereUniqueInput[]
    update?: TokenAllocationUpdateWithWhereUniqueWithoutOutcomeInput | TokenAllocationUpdateWithWhereUniqueWithoutOutcomeInput[]
    updateMany?: TokenAllocationUpdateManyWithWhereWithoutOutcomeInput | TokenAllocationUpdateManyWithWhereWithoutOutcomeInput[]
    deleteMany?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutOutcomeNestedInput = {
    create?: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput> | TradeCreateWithoutOutcomeInput[] | TradeUncheckedCreateWithoutOutcomeInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOutcomeInput | TradeCreateOrConnectWithoutOutcomeInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutOutcomeInput | TradeUpsertWithWhereUniqueWithoutOutcomeInput[]
    createMany?: TradeCreateManyOutcomeInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutOutcomeInput | TradeUpdateWithWhereUniqueWithoutOutcomeInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutOutcomeInput | TradeUpdateManyWithWhereWithoutOutcomeInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutToken_allocatedInput = {
    create?: XOR<UserCreateWithoutToken_allocatedInput, UserUncheckedCreateWithoutToken_allocatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutToken_allocatedInput
    connect?: UserWhereUniqueInput
  }

  export type OutcomeCreateNestedOneWithoutTokenAllocationsInput = {
    create?: XOR<OutcomeCreateWithoutTokenAllocationsInput, OutcomeUncheckedCreateWithoutTokenAllocationsInput>
    connectOrCreate?: OutcomeCreateOrConnectWithoutTokenAllocationsInput
    connect?: OutcomeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutToken_allocatedNestedInput = {
    create?: XOR<UserCreateWithoutToken_allocatedInput, UserUncheckedCreateWithoutToken_allocatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutToken_allocatedInput
    upsert?: UserUpsertWithoutToken_allocatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutToken_allocatedInput, UserUpdateWithoutToken_allocatedInput>, UserUncheckedUpdateWithoutToken_allocatedInput>
  }

  export type OutcomeUpdateOneRequiredWithoutTokenAllocationsNestedInput = {
    create?: XOR<OutcomeCreateWithoutTokenAllocationsInput, OutcomeUncheckedCreateWithoutTokenAllocationsInput>
    connectOrCreate?: OutcomeCreateOrConnectWithoutTokenAllocationsInput
    upsert?: OutcomeUpsertWithoutTokenAllocationsInput
    connect?: OutcomeWhereUniqueInput
    update?: XOR<XOR<OutcomeUpdateToOneWithWhereWithoutTokenAllocationsInput, OutcomeUpdateWithoutTokenAllocationsInput>, OutcomeUncheckedUpdateWithoutTokenAllocationsInput>
  }

  export type MarketCreateNestedOneWithoutTradesInput = {
    create?: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    connectOrCreate?: MarketCreateOrConnectWithoutTradesInput
    connect?: MarketWhereUniqueInput
  }

  export type OutcomeCreateNestedOneWithoutTradesInput = {
    create?: XOR<OutcomeCreateWithoutTradesInput, OutcomeUncheckedCreateWithoutTradesInput>
    connectOrCreate?: OutcomeCreateOrConnectWithoutTradesInput
    connect?: OutcomeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTradesInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType
  }

  export type MarketUpdateOneWithoutTradesNestedInput = {
    create?: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    connectOrCreate?: MarketCreateOrConnectWithoutTradesInput
    upsert?: MarketUpsertWithoutTradesInput
    disconnect?: MarketWhereInput | boolean
    delete?: MarketWhereInput | boolean
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutTradesInput, MarketUpdateWithoutTradesInput>, MarketUncheckedUpdateWithoutTradesInput>
  }

  export type OutcomeUpdateOneWithoutTradesNestedInput = {
    create?: XOR<OutcomeCreateWithoutTradesInput, OutcomeUncheckedCreateWithoutTradesInput>
    connectOrCreate?: OutcomeCreateOrConnectWithoutTradesInput
    upsert?: OutcomeUpsertWithoutTradesInput
    disconnect?: OutcomeWhereInput | boolean
    delete?: OutcomeWhereInput | boolean
    connect?: OutcomeWhereUniqueInput
    update?: XOR<XOR<OutcomeUpdateToOneWithWhereWithoutTradesInput, OutcomeUpdateWithoutTradesInput>, OutcomeUncheckedUpdateWithoutTradesInput>
  }

  export type UserUpdateOneWithoutTradesNestedInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    upsert?: UserUpsertWithoutTradesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradesInput, UserUpdateWithoutTradesInput>, UserUncheckedUpdateWithoutTradesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type MarketCreateWithoutCreatorInput = {
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutMarketInput
    outcome?: OutcomeCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutCreatorInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    outcome?: OutcomeUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutCreatorInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput>
  }

  export type MarketCreateManyCreatorInputEnvelope = {
    data: MarketCreateManyCreatorInput | MarketCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type TradeCreateWithoutUserInput = {
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market?: MarketCreateNestedOneWithoutTradesInput
    outcome?: OutcomeCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutUserInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    outcomeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutUserInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeCreateManyUserInputEnvelope = {
    data: TradeCreateManyUserInput | TradeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenAllocationCreateWithoutUserInput = {
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    outcome: OutcomeCreateNestedOneWithoutTokenAllocationsInput
  }

  export type TokenAllocationUncheckedCreateWithoutUserInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    outcomeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationCreateOrConnectWithoutUserInput = {
    where: TokenAllocationWhereUniqueInput
    create: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput>
  }

  export type TokenAllocationCreateManyUserInputEnvelope = {
    data: TokenAllocationCreateManyUserInput | TokenAllocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MarketUpsertWithWhereUniqueWithoutCreatorInput = {
    where: MarketWhereUniqueInput
    update: XOR<MarketUpdateWithoutCreatorInput, MarketUncheckedUpdateWithoutCreatorInput>
    create: XOR<MarketCreateWithoutCreatorInput, MarketUncheckedCreateWithoutCreatorInput>
  }

  export type MarketUpdateWithWhereUniqueWithoutCreatorInput = {
    where: MarketWhereUniqueInput
    data: XOR<MarketUpdateWithoutCreatorInput, MarketUncheckedUpdateWithoutCreatorInput>
  }

  export type MarketUpdateManyWithWhereWithoutCreatorInput = {
    where: MarketScalarWhereInput
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyWithoutCreatorInput>
  }

  export type MarketScalarWhereInput = {
    AND?: MarketScalarWhereInput | MarketScalarWhereInput[]
    OR?: MarketScalarWhereInput[]
    NOT?: MarketScalarWhereInput | MarketScalarWhereInput[]
    id?: IntFilter<"Market"> | number
    description?: StringFilter<"Market"> | string
    resolution_criteria?: StringFilter<"Market"> | string
    question?: StringFilter<"Market"> | string
    expiry_date?: DateTimeFilter<"Market"> | Date | string
    image?: StringNullableFilter<"Market"> | string | null
    tags?: StringNullableListFilter<"Market">
    status?: EnumEventStatusFilter<"Market"> | $Enums.EventStatus
    outcomeWon?: IntNullableFilter<"Market"> | number | null
    creatorId?: IntFilter<"Market"> | number
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
  }

  export type TradeUpsertWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
  }

  export type TradeUpdateManyWithWhereWithoutUserInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutUserInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: IntFilter<"Trade"> | number
    unique_id?: StringFilter<"Trade"> | string
    order_type?: EnumOrderTypeFilter<"Trade"> | $Enums.OrderType
    order_size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    marketID?: IntNullableFilter<"Trade"> | number | null
    outcomeId?: IntNullableFilter<"Trade"> | number | null
    userID?: IntNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type TokenAllocationUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenAllocationWhereUniqueInput
    update: XOR<TokenAllocationUpdateWithoutUserInput, TokenAllocationUncheckedUpdateWithoutUserInput>
    create: XOR<TokenAllocationCreateWithoutUserInput, TokenAllocationUncheckedCreateWithoutUserInput>
  }

  export type TokenAllocationUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenAllocationWhereUniqueInput
    data: XOR<TokenAllocationUpdateWithoutUserInput, TokenAllocationUncheckedUpdateWithoutUserInput>
  }

  export type TokenAllocationUpdateManyWithWhereWithoutUserInput = {
    where: TokenAllocationScalarWhereInput
    data: XOR<TokenAllocationUpdateManyMutationInput, TokenAllocationUncheckedUpdateManyWithoutUserInput>
  }

  export type TokenAllocationScalarWhereInput = {
    AND?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
    OR?: TokenAllocationScalarWhereInput[]
    NOT?: TokenAllocationScalarWhereInput | TokenAllocationScalarWhereInput[]
    id?: IntFilter<"TokenAllocation"> | number
    amount?: DecimalFilter<"TokenAllocation"> | Decimal | DecimalJsLike | number | string
    userId?: IntFilter<"TokenAllocation"> | number
    outcomeId?: IntFilter<"TokenAllocation"> | number
    createdAt?: DateTimeFilter<"TokenAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"TokenAllocation"> | Date | string
  }

  export type UserCreateWithoutMarketsInput = {
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    token_allocated?: TokenAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMarketsInput = {
    id?: number
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    token_allocated?: TokenAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMarketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMarketsInput, UserUncheckedCreateWithoutMarketsInput>
  }

  export type TradeCreateWithoutMarketInput = {
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    outcome?: OutcomeCreateNestedOneWithoutTradesInput
    user?: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutMarketInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    outcomeId?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutMarketInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput>
  }

  export type TradeCreateManyMarketInputEnvelope = {
    data: TradeCreateManyMarketInput | TradeCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type OutcomeCreateWithoutMarketInput = {
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenAllocations?: TokenAllocationCreateNestedManyWithoutOutcomeInput
    trades?: TradeCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeUncheckedCreateWithoutMarketInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenAllocations?: TokenAllocationUncheckedCreateNestedManyWithoutOutcomeInput
    trades?: TradeUncheckedCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeCreateOrConnectWithoutMarketInput = {
    where: OutcomeWhereUniqueInput
    create: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput>
  }

  export type OutcomeCreateManyMarketInputEnvelope = {
    data: OutcomeCreateManyMarketInput | OutcomeCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMarketsInput = {
    update: XOR<UserUpdateWithoutMarketsInput, UserUncheckedUpdateWithoutMarketsInput>
    create: XOR<UserCreateWithoutMarketsInput, UserUncheckedCreateWithoutMarketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMarketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMarketsInput, UserUncheckedUpdateWithoutMarketsInput>
  }

  export type UserUpdateWithoutMarketsInput = {
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    token_allocated?: TokenAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMarketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    token_allocated?: TokenAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TradeUpsertWithWhereUniqueWithoutMarketInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutMarketInput, TradeUncheckedUpdateWithoutMarketInput>
    create: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutMarketInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutMarketInput, TradeUncheckedUpdateWithoutMarketInput>
  }

  export type TradeUpdateManyWithWhereWithoutMarketInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutMarketInput>
  }

  export type OutcomeUpsertWithWhereUniqueWithoutMarketInput = {
    where: OutcomeWhereUniqueInput
    update: XOR<OutcomeUpdateWithoutMarketInput, OutcomeUncheckedUpdateWithoutMarketInput>
    create: XOR<OutcomeCreateWithoutMarketInput, OutcomeUncheckedCreateWithoutMarketInput>
  }

  export type OutcomeUpdateWithWhereUniqueWithoutMarketInput = {
    where: OutcomeWhereUniqueInput
    data: XOR<OutcomeUpdateWithoutMarketInput, OutcomeUncheckedUpdateWithoutMarketInput>
  }

  export type OutcomeUpdateManyWithWhereWithoutMarketInput = {
    where: OutcomeScalarWhereInput
    data: XOR<OutcomeUpdateManyMutationInput, OutcomeUncheckedUpdateManyWithoutMarketInput>
  }

  export type OutcomeScalarWhereInput = {
    AND?: OutcomeScalarWhereInput | OutcomeScalarWhereInput[]
    OR?: OutcomeScalarWhereInput[]
    NOT?: OutcomeScalarWhereInput | OutcomeScalarWhereInput[]
    id?: IntFilter<"Outcome"> | number
    outcome_title?: StringFilter<"Outcome"> | string
    current_supply?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFilter<"Outcome"> | Decimal | DecimalJsLike | number | string
    marketID?: IntFilter<"Outcome"> | number
    createdAt?: DateTimeFilter<"Outcome"> | Date | string
    updatedAt?: DateTimeFilter<"Outcome"> | Date | string
  }

  export type MarketCreateWithoutOutcomeInput = {
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutMarketsInput
    trades?: TradeCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutOutcomeInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    creatorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutOutcomeInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutOutcomeInput, MarketUncheckedCreateWithoutOutcomeInput>
  }

  export type TokenAllocationCreateWithoutOutcomeInput = {
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutToken_allocatedInput
  }

  export type TokenAllocationUncheckedCreateWithoutOutcomeInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationCreateOrConnectWithoutOutcomeInput = {
    where: TokenAllocationWhereUniqueInput
    create: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput>
  }

  export type TokenAllocationCreateManyOutcomeInputEnvelope = {
    data: TokenAllocationCreateManyOutcomeInput | TokenAllocationCreateManyOutcomeInput[]
    skipDuplicates?: boolean
  }

  export type TradeCreateWithoutOutcomeInput = {
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market?: MarketCreateNestedOneWithoutTradesInput
    user?: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutOutcomeInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutOutcomeInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput>
  }

  export type TradeCreateManyOutcomeInputEnvelope = {
    data: TradeCreateManyOutcomeInput | TradeCreateManyOutcomeInput[]
    skipDuplicates?: boolean
  }

  export type MarketUpsertWithoutOutcomeInput = {
    update: XOR<MarketUpdateWithoutOutcomeInput, MarketUncheckedUpdateWithoutOutcomeInput>
    create: XOR<MarketCreateWithoutOutcomeInput, MarketUncheckedCreateWithoutOutcomeInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutOutcomeInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutOutcomeInput, MarketUncheckedUpdateWithoutOutcomeInput>
  }

  export type MarketUpdateWithoutOutcomeInput = {
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutMarketsNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutOutcomeInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    creatorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type TokenAllocationUpsertWithWhereUniqueWithoutOutcomeInput = {
    where: TokenAllocationWhereUniqueInput
    update: XOR<TokenAllocationUpdateWithoutOutcomeInput, TokenAllocationUncheckedUpdateWithoutOutcomeInput>
    create: XOR<TokenAllocationCreateWithoutOutcomeInput, TokenAllocationUncheckedCreateWithoutOutcomeInput>
  }

  export type TokenAllocationUpdateWithWhereUniqueWithoutOutcomeInput = {
    where: TokenAllocationWhereUniqueInput
    data: XOR<TokenAllocationUpdateWithoutOutcomeInput, TokenAllocationUncheckedUpdateWithoutOutcomeInput>
  }

  export type TokenAllocationUpdateManyWithWhereWithoutOutcomeInput = {
    where: TokenAllocationScalarWhereInput
    data: XOR<TokenAllocationUpdateManyMutationInput, TokenAllocationUncheckedUpdateManyWithoutOutcomeInput>
  }

  export type TradeUpsertWithWhereUniqueWithoutOutcomeInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutOutcomeInput, TradeUncheckedUpdateWithoutOutcomeInput>
    create: XOR<TradeCreateWithoutOutcomeInput, TradeUncheckedCreateWithoutOutcomeInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutOutcomeInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutOutcomeInput, TradeUncheckedUpdateWithoutOutcomeInput>
  }

  export type TradeUpdateManyWithWhereWithoutOutcomeInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutOutcomeInput>
  }

  export type UserCreateWithoutToken_allocatedInput = {
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketCreateNestedManyWithoutCreatorInput
    trades?: TradeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutToken_allocatedInput = {
    id?: number
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketUncheckedCreateNestedManyWithoutCreatorInput
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutToken_allocatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutToken_allocatedInput, UserUncheckedCreateWithoutToken_allocatedInput>
  }

  export type OutcomeCreateWithoutTokenAllocationsInput = {
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market: MarketCreateNestedOneWithoutOutcomeInput
    trades?: TradeCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeUncheckedCreateWithoutTokenAllocationsInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    marketID: number
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeCreateOrConnectWithoutTokenAllocationsInput = {
    where: OutcomeWhereUniqueInput
    create: XOR<OutcomeCreateWithoutTokenAllocationsInput, OutcomeUncheckedCreateWithoutTokenAllocationsInput>
  }

  export type UserUpsertWithoutToken_allocatedInput = {
    update: XOR<UserUpdateWithoutToken_allocatedInput, UserUncheckedUpdateWithoutToken_allocatedInput>
    create: XOR<UserCreateWithoutToken_allocatedInput, UserUncheckedCreateWithoutToken_allocatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutToken_allocatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutToken_allocatedInput, UserUncheckedUpdateWithoutToken_allocatedInput>
  }

  export type UserUpdateWithoutToken_allocatedInput = {
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUpdateManyWithoutCreatorNestedInput
    trades?: TradeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutToken_allocatedInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUncheckedUpdateManyWithoutCreatorNestedInput
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OutcomeUpsertWithoutTokenAllocationsInput = {
    update: XOR<OutcomeUpdateWithoutTokenAllocationsInput, OutcomeUncheckedUpdateWithoutTokenAllocationsInput>
    create: XOR<OutcomeCreateWithoutTokenAllocationsInput, OutcomeUncheckedCreateWithoutTokenAllocationsInput>
    where?: OutcomeWhereInput
  }

  export type OutcomeUpdateToOneWithWhereWithoutTokenAllocationsInput = {
    where?: OutcomeWhereInput
    data: XOR<OutcomeUpdateWithoutTokenAllocationsInput, OutcomeUncheckedUpdateWithoutTokenAllocationsInput>
  }

  export type OutcomeUpdateWithoutTokenAllocationsInput = {
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutOutcomeNestedInput
    trades?: TradeUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeUncheckedUpdateWithoutTokenAllocationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutOutcomeNestedInput
  }

  export type MarketCreateWithoutTradesInput = {
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutMarketsInput
    outcome?: OutcomeCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutTradesInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    creatorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    outcome?: OutcomeUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutTradesInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
  }

  export type OutcomeCreateWithoutTradesInput = {
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    market: MarketCreateNestedOneWithoutOutcomeInput
    tokenAllocations?: TokenAllocationCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeUncheckedCreateWithoutTradesInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    marketID: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenAllocations?: TokenAllocationUncheckedCreateNestedManyWithoutOutcomeInput
  }

  export type OutcomeCreateOrConnectWithoutTradesInput = {
    where: OutcomeWhereUniqueInput
    create: XOR<OutcomeCreateWithoutTradesInput, OutcomeUncheckedCreateWithoutTradesInput>
  }

  export type UserCreateWithoutTradesInput = {
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketCreateNestedManyWithoutCreatorInput
    token_allocated?: TokenAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradesInput = {
    id?: number
    username: string
    about: string
    wallet_address: string
    role?: $Enums.Role
    profile_pic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    markets?: MarketUncheckedCreateNestedManyWithoutCreatorInput
    token_allocated?: TokenAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
  }

  export type MarketUpsertWithoutTradesInput = {
    update: XOR<MarketUpdateWithoutTradesInput, MarketUncheckedUpdateWithoutTradesInput>
    create: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutTradesInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutTradesInput, MarketUncheckedUpdateWithoutTradesInput>
  }

  export type MarketUpdateWithoutTradesInput = {
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutMarketsNestedInput
    outcome?: OutcomeUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutTradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    creatorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: OutcomeUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type OutcomeUpsertWithoutTradesInput = {
    update: XOR<OutcomeUpdateWithoutTradesInput, OutcomeUncheckedUpdateWithoutTradesInput>
    create: XOR<OutcomeCreateWithoutTradesInput, OutcomeUncheckedCreateWithoutTradesInput>
    where?: OutcomeWhereInput
  }

  export type OutcomeUpdateToOneWithWhereWithoutTradesInput = {
    where?: OutcomeWhereInput
    data: XOR<OutcomeUpdateWithoutTradesInput, OutcomeUncheckedUpdateWithoutTradesInput>
  }

  export type OutcomeUpdateWithoutTradesInput = {
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutOutcomeNestedInput
    tokenAllocations?: TokenAllocationUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeUncheckedUpdateWithoutTradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenAllocations?: TokenAllocationUncheckedUpdateManyWithoutOutcomeNestedInput
  }

  export type UserUpsertWithoutTradesInput = {
    update: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
  }

  export type UserUpdateWithoutTradesInput = {
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUpdateManyWithoutCreatorNestedInput
    token_allocated?: TokenAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    wallet_address?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    profile_pic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    markets?: MarketUncheckedUpdateManyWithoutCreatorNestedInput
    token_allocated?: TokenAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MarketCreateManyCreatorInput = {
    id?: number
    description?: string
    resolution_criteria?: string
    question: string
    expiry_date: Date | string
    image?: string | null
    tags?: MarketCreatetagsInput | string[]
    status?: $Enums.EventStatus
    outcomeWon?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateManyUserInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    outcomeId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationCreateManyUserInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    outcomeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketUpdateWithoutCreatorInput = {
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutMarketNestedInput
    outcome?: OutcomeUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    outcome?: OutcomeUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    resolution_criteria?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MarketUpdatetagsInput | string[]
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    outcomeWon?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUpdateWithoutUserInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneWithoutTradesNestedInput
    outcome?: OutcomeUpdateOneWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationUpdateWithoutUserInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: OutcomeUpdateOneRequiredWithoutTokenAllocationsNestedInput
  }

  export type TokenAllocationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outcomeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outcomeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyMarketInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    outcomeId?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OutcomeCreateManyMarketInput = {
    id?: number
    outcome_title: string
    current_supply?: Decimal | DecimalJsLike | number | string
    total_liquidity?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateWithoutMarketInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: OutcomeUpdateOneWithoutTradesNestedInput
    user?: UserUpdateOneWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutMarketInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutMarketInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outcomeId?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutcomeUpdateWithoutMarketInput = {
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenAllocations?: TokenAllocationUpdateManyWithoutOutcomeNestedInput
    trades?: TradeUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeUncheckedUpdateWithoutMarketInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenAllocations?: TokenAllocationUncheckedUpdateManyWithoutOutcomeNestedInput
    trades?: TradeUncheckedUpdateManyWithoutOutcomeNestedInput
  }

  export type OutcomeUncheckedUpdateManyWithoutMarketInput = {
    id?: IntFieldUpdateOperationsInput | number
    outcome_title?: StringFieldUpdateOperationsInput | string
    current_supply?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total_liquidity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationCreateManyOutcomeInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateManyOutcomeInput = {
    id?: number
    unique_id?: string
    order_type?: $Enums.OrderType
    order_size?: Decimal | DecimalJsLike | number | string
    amount?: Decimal | DecimalJsLike | number | string
    afterPrice?: Decimal | DecimalJsLike | number | string
    marketID?: number | null
    userID?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenAllocationUpdateWithoutOutcomeInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutToken_allocatedNestedInput
  }

  export type TokenAllocationUncheckedUpdateWithoutOutcomeInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenAllocationUncheckedUpdateManyWithoutOutcomeInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUpdateWithoutOutcomeInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneWithoutTradesNestedInput
    user?: UserUpdateOneWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutOutcomeInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutOutcomeInput = {
    id?: IntFieldUpdateOperationsInput | number
    unique_id?: StringFieldUpdateOperationsInput | string
    order_type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    order_size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    afterPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketID?: NullableIntFieldUpdateOperationsInput | number | null
    userID?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}