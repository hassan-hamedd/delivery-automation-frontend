import Mock from '../mock'

const JWT_SECRET = 'jwt_secret_key'
const JWT_VALIDITY = '7 days'

const userList = [
    {
        id: 1,
        role: 'SA',
        name: 'Patrick Wehbe',
        username: '',
        email: 'admin@deliveryautomation.com',
        avatar: 'DeliveryAutomation123',
        age: 20,
    },
]

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

Mock.onPost('/api/auth/login').reply(async (config) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const { email } = JSON.parse(config.data)
        const user = userList.find((u) => u.email === email)

        if (!user) {
            return [400, { message: 'Invalid email or password' }]
        }
        const accessToken = 'accessToken'

        return [
            200,
            {
                accessToken,
                user: {
                    id: user.id,
                    avatar: user.avatar,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
        ]
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})

Mock.onPost('/api/auth/register').reply((config) => {
    try {
        const { email, username } = JSON.parse(config.data)
        const user = userList.find((u) => u.email === email)

        if (user) {
            return [400, { message: 'User already exists!' }]
        }
        const newUser = {
            id: 2,
            role: 'GUEST',
            name: '',
            username: username,
            email: email,
            avatar: 'src/assets/images/face-6.jpg',
            age: 25,
        }
        userList.push(newUser)

        const accessToken = 'accessToken'

        return [
            200,
            {
                accessToken,
                user: {
                    id: newUser.id,
                    avatar: newUser.avatar,
                    email: newUser.email,
                    name: newUser.name,
                    username: newUser.username,
                    role: newUser.role,
                },
            },
        ]
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})

Mock.onGet('/api/auth/profile').reply((config) => {
    try {
        const { Authorization } = config.headers
        if (!Authorization) {
            return [401, { message: 'Invalid Authorization token' }]
        }

        const accessToken = Authorization.split(' ')[1]
        const user = userList[0]

        if (!user) {
            return [401, { message: 'Invalid authorization token' }]
        }

        return [
            200,
            {
                user: {
                    id: user.id,
                    avatar: user.avatar,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
        ]
    } catch (err) {
        console.error(err)
        return [500, { message: 'Internal server error' }]
    }
})
