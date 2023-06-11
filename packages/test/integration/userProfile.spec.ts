import app from "@packages/api";
import { UserSignUpInfo } from "@packages/api/models";
import * as userService from "@packages/api/services/users/userService";
import * as userDbService from "@packages/db/services/users/userService";
import { v4 as uuidv4 } from "uuid";
import { DbUserProfile } from "@packages/db";

const request = require("supertest");

const req = request(app);

describe("User profile integration tests", () => {
  let userProfiles: DbUserProfile[] = [];
  const mock = jest.spyOn(userService, "createNewUser");
  const getProfileMock = jest.spyOn(userDbService, "getUserProfileById");
  getProfileMock.mockImplementation((id: string) => {
    return Promise.resolve(userProfiles.find((u) => u.id === id));
  });
  const getProfileByCredentialsMock = jest.spyOn(
    userDbService,
    "getUserProfileByCredentialsId"
  );
  const patchUserProfileMock = jest.spyOn(userDbService, "updateUserProfile");
  getProfileByCredentialsMock.mockImplementation((userId: string) => {
    return Promise.resolve(userProfiles.find((u) => u.userId === userId));
  });
  mock.mockImplementation((userProfile: UserSignUpInfo) => {
    if (!userProfile.email || !userProfile.userId) {
      throw new Error("Bad request");
    } else {
      return Promise.resolve({ ...userProfile, id: uuidv4() });
    }
  });
  patchUserProfileMock.mockImplementation(
    (id: string, body: Partial<DbUserProfile>) => {
      const profileToUpdate = userProfiles.find((u) => u.id === id);
      if (!profileToUpdate) {
        return Promise.resolve(undefined);
      }
      return Promise.resolve({ ...profileToUpdate, ...body });
    }
  );
  afterAll(() => {
    mock.mockRestore();
    getProfileMock.mockRestore();
    getProfileByCredentialsMock.mockRestore();
    patchUserProfileMock.mockRestore();
  });
  it("Adding a user profile should succeed", async () => {
    const body: UserSignUpInfo = {
      email: "lala@gmail.com",
      userId: "auth0|12345",
    };
    const userProfile = await req
      .post("/users/signup")
      .send(body)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(userProfile.body.email).toEqual(body.email);
    userProfiles.push(userProfile.body);
  });
  it("Should fail when body is incomplete", async () => {
    const body = {
      email: "lala@gmail.com",
    };
    const res = await req.post("/users/signup").send(body);
    expect(res.error).not.toEqual(false);
  });
  it("Should fetch user profile if id exists", async () => {
    const existingId = userProfiles[0].id;
    const res = await req.get(`/users/profile/${existingId}`);
    expect(res.body).toBeDefined();
  });
  it("Should fail fetching user profile if id doesn't exist", async () => {
    const undefinedId = "1234";
    const res = await req.get(`/users/profile/${undefinedId}`);
    expect(res.error).not.toEqual(false);
  });
  it("Should fetch user profile if auth0 id exists", async () => {
    const existingAuth0Id = userProfiles[0].userId;
    const res = await req.get(`/users/login/${existingAuth0Id}`);
    expect(res.body).toBeDefined();
  });
  it("Should fail fetching user profile if auth0 id doesn't exist", async () => {
    const undefinedAuth0Id = "auth0|unknown";
    const res = await req.get(`/users/login/${undefinedAuth0Id}`);
    expect(res.error).not.toEqual(false);
  });
  it("Should patch the user profile if id exists", async () => {
    const existingId = userProfiles[0].id;
    const body: Partial<DbUserProfile> = {
      firstName: "Test",
      lastName: "Name",
    };
    const res = await req.patch(`/users/profile/${existingId}`).send(body);
    expect(res.body.firstName).toEqual(body.firstName);
    expect(res.body.lastName).toEqual(body.lastName);
  });
  it("Should fail patching the user profile if id doesn't exist", async () => {
    const undefinedId = "unknown";
    const body: Partial<DbUserProfile> = {
      firstName: "lala",
    };
    const res = await req.patch(`/users/profile/${undefinedId}`).send(body);
    expect(res.error).not.toEqual(false);
  });
});
