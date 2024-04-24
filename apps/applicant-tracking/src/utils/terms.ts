type TermSemester = 'Spring' | 'Fall';
export type Term = `${TermSemester} ${number}`;

export function getCurrentTerm(): Term {
    const date = new Date();
    const semester: TermSemester = date.getMonth() < 6? 'Spring' : 'Fall';
    const year = date.getFullYear();
    return `${semester} ${year}`;
}

export function getNextTerm(term: Term): Term {
    let [semester, year] = getCurrentTerm().split(' ');

    if(semester == 'Spring') { 
        return `Fall ${parseInt(year)}`; 
    } else {
        let newYear = parseInt(year) + 1;
        return `Spring ${newYear}`;        
    }
}

export function getPreviousTerm(term: Term): Term {
    let [semester, year] = getCurrentTerm().split(' ');

    if(semester == 'Spring') { 
        let previousYear = parseInt(year) - 1;
        return `Fall ${previousYear}`; 
    } else {
        return `Spring ${parseInt(year)}`;        
    }
}

