import { Profile } from '../../models/profile/profile.interface';

const userList: Profile[] = [
    { firstName: 'Paul', lastName: 'Halliday', email: 'paul@paul.com', avatar: 'assets/imgs/avatar.png', dateOfBirth: new Date() },
    { firstName: 'John', lastName: 'Doe', email: 'paul@paul.com', avatar: 'assets/imgs/avatar.png', dateOfBirth: new Date() },
    { firstName: 'Sarah', lastName: 'Smith', email: 'sarah@smith.com', avatar: 'assets/imgs/avatar.png', dateOfBirth: new Date() },
    { firstName: 'Roger', lastName: 'Reynolds', email: 'roger@reynolds.com', avatar: 'assets/imgs/avatar.png', dateOfBirth: new Date() }
]

export const USER_LIST = userList;