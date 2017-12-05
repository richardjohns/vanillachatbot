const patternDict = [
    {
    pattern: '\b(Hi|Hello|Hey)\\b',
    intent: 'Hello'
    },
    {
    pattern: '\\b(bye|exit)\\b',
    intent: 'Bye'
    }

]

module.exports = patternDict