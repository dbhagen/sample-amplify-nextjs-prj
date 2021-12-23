import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TestModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TestModel {
  readonly id: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TestModel, TestModelMetaData>);
  static copyOf(source: TestModel, mutator: (draft: MutableModel<TestModel, TestModelMetaData>) => MutableModel<TestModel, TestModelMetaData> | void): TestModel;
}