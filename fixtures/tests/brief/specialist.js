import { login, signOut } from '../../flows/login/buyer';
import { create } from '../../flows/brief/specialist';
import { startBrief } from '../../flows/dashboard/buyer';

describe('should be able to create specialist brief', () => {
    let areaOfExpertises = [
        'Strategy and Policy',
        'User research and Design',
        'Agile delivery and Governance',
        'Software engineering and Development',
        'Support and Operations',
        'Content and Publishing',
        'Change and Transformation',
        'Training, Learning and Development',
        'Marketing, Communications and Engagement',
        'Cyber security',
        'Data science',
        'Emerging technologies'
    ];
    beforeEach(async () => {
        await login();
    });
    afterEach(async () => {
        await signOut();
    });
    areaOfExpertises.forEach((areaOfExpertise) => {
        it('should create specialist brief of ' + areaOfExpertise, async () => {
            let now = Date.now();
            await startBrief();
            await create({
                title: `${areaOfExpertise} Role ${now.valueOf()}`,
                areaOfExpertise: areaOfExpertise,
                locations: ['Australian Capital Territory', 'Tasmania'],
                evaluations: [
                    'References',
                    'Interview',
                    'Scenario or test',
                    'Presentation'
                ]
            });
        });
    });
})