let isModule = false

try {
    module.exports = {
    }
    isModule = true
} catch { }

//#region HTMLElement

var query

if (!isModule) {
    Object.defineProperty(HTMLElement.prototype, 'html', {
        get: function () { return this.innerHTML },
        set: function (value) { this.innerHTML = value }
    });

    HTMLElement.prototype.setTag = function (tagName) {
        const uniqueClassName = 20..do('_', () => {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.random
        })

        this.addClass(uniqueClassName)

        this.tag = tagName

        const element = document.query('.' + uniqueClassName)
        element.removeClass(uniqueClassName)
        return element
    }

    Object.defineProperty(HTMLElement.prototype, 'tag', {
        get: function () { return this.tagName },
        set: function (newTagName) {
            let { outerHTML, tagName } = this

            outerHTML = '<' + newTagName + outerHTML.substring(1 + tagName.length, outerHTML.length - tagName.length - 1) + newTagName + '>'
            this.outerHTML = outerHTML
        },
    });

    Object.defineProperty(HTMLElement.prototype, 'x', {
        get: function () { return this.getBoundingClientRect().x },
    });

    Object.defineProperty(HTMLElement.prototype, 'y', {
        get: function () { return this.getBoundingClientRect().y },
    });

    Object.defineProperty(HTMLElement.prototype, 'width', {
        get: function () { return this.getBoundingClientRect().width },
    });

    Object.defineProperty(HTMLElement.prototype, 'height', {
        get: function () { return this.getBoundingClientRect().height },
    });

    HTMLElement.prototype.addClass = function (className) {
        this.classList.add(className)
    }

    HTMLElement.prototype.removeClass = function (className) {
        this.classList.remove(className)
    }

    HTMLElement.prototype.toggleClass = function (className) {
        this.classList.toggle(className)
    }

    HTMLElement.prototype.containsClass = function (className) {
        this.classList.contains(className)
    }

    HTMLElement.prototype.query = function (selector) {
        return this.querySelector(selector)
    }

    HTMLElement.prototype.queryAll = function (selector) {
        return Array.from(this.querySelectorAll(selector))
    }

    HTMLDocument.prototype.query = function (selector) {
        return document.querySelector(selector)
    }

    HTMLDocument.prototype.queryAll = function (selector) {
        return Array.from(document.querySelectorAll(selector))
    }

    query = document.query
    queryAll = document.queryAll
}

//#endregion

//#region Loops
Number.prototype.for = function (fun, steps) {
    if (steps === undefined) steps = 1
    if (steps === 0) return
    if (steps > 0) {
        for (let i = 0; i < Math.abs(this); i += steps) fun(i)
    } else {
        for (let i = 0; i > -Math.abs(this); i += steps) fun(i)
    }
}

String.prototype.forEach = function (fun) {
    if (steps === undefined) steps = 1
    if (steps <= 0) return
    this.toArray().forEach(fun)
}

Number.prototype.do = function (res, fun, steps) {
    if (steps === undefined) steps = 1
    for (let i = 0; i < this; i += steps) {
        res += fun(i)
    }
    return res
}

Array.prototype.do = function (res, fun) {
    this.forEach(v => {
        res += fun(v)
    })
    return res
}

String.prototype.do = function (res, fun) {
    return this.split("").do(res, fun)
}

Number.prototype.progress = function (fun) {
    if (this <= 0) return
    this.for(i => {
        const progress = i / (this - 1)
        fun(this, i, progress)
    })
}

String.prototype.progress = function (fun) {
    this.asArray.forEach((str, i) => {
        const progress = i / (this.length - 1)
        fun(str, i, progress)
    })
}

Array.prototype.progress = function (fun) {
    this.forEach((iv, i) => {
        const progress = i / (this.length - 1)
        fun(iv, i, progress)
    })
}
//#endregion

//#region Insert
Array.prototype.insert = function (index, element) {
    this.splice(index, 0, element)
    return this
}

String.prototype.insert = function (index, element) {
    return this.substr(0, index) + element + this.substr(index);
}

//#endregion

//#region Array
Object.defineProperty(Array.prototype, 'first', {
    get: function () { return this[0] },
})

Object.defineProperty(Array.prototype, 'last', {
    get: function () { return this[this.length - 1] },
})

Array.prototype.add = function (...args) {
    args.forEach(i => {
        if (i instanceof Array) {
            i.forEach(j => {
                this.push(j)
            })
        } else {
            this.push(i)
        }
    })

    return this
}

Array.prototype.copyFrom = function (source) {
    for (var i = 0; i < source.length; i++) {
        this[i] = source[i]
    }
    this.length = source.length
    return this
}
//#endregion

//#region String
String.prototype.toElement = function () {
    const el = document.createElement("div")
    el.innerHTML = this
    return el.firstChild
}

String.prototype.append = function (str) {
    return this + str
}

String.prototype.toClipboard = function () {
    let element = document.createElement('input')
    document.body.append(element)

    element.value = this

    element.select()
    element.setSelectionRange(0, 99999)

    document.execCommand('copy')

    document.body.removeChild(element)
}

String.prototype.replaceEach = function (search, replacement) {
    return this.split(search).join(replacement ?? '')
}
//#endregion

//#region Number

Number.prototype.minmax = function(min, max) {
    if (max === undefined) {
        max = min
        min = 0
    }
    if (max < min) [max,min] = [min,max]
    return Math.min(max, Math.max(min, this))
}

Number.prototype.map = function(inMin, inMax, outMin, outMax) {
    if (outMin === undefined && outMax === undefined) {
        outMax = inMax
        inMax = inMin
        outMin = 0
        inMin = 0
    }
    inMin = inMin ?? 0
    outMin = outMin ?? 0
    return ((this - inMin)/(inMax - inMin) * (outMax)) + outMin
}

Number.prototype.mapminmax = function(inMin, inMax, outMin, outMax) {
    if (outMin === undefined && outMax === undefined) {
        inMax = inMin
        inMin = 0
    }
    inMin = inMin ?? 0
    return this.minmax(inMin, inMax).map(...arguments)
}

//#endregion

//#region as/to Array/String
String.prototype.toArray = function () {
    return this.split("")
}

Object.defineProperty(String.prototype, 'asArray', {
    get: function () { return this.split("") },
})

Object.defineProperty(Array.prototype, 'asString', {
    get: function () { return this.join("") },
    set: function (value) { this.copyFrom(value.asArray) }
})
//#endregion

//#region random
Object.defineProperty(Number.prototype, 'random', {
    get: function () { return Math.floor(Math.random() * this) },
})

Object.defineProperty(Array.prototype, 'random', {
    get: function () { return this[Math.floor(Math.random() * this.length)] },
})

Object.defineProperty(String.prototype, 'random', {
    get: function () { let array = this.split(""); return array[Math.floor(Math.random() * array.length)] },
})
//#endregion

function definePropertyAll() {
    function getSupportedTypes() {
        let types = ["Number", "String", "Array"]
        if (!isModule) {
            types.push("HTMLElement")
            types.push("document.head.style")
        }
        return types
    }

    function getPrototypes(type) {
        let prototypes

        try {
            prototypes = Object.getOwnPropertyNames(eval(type + '.prototype'))
        } catch {
            prototypes = Object.getOwnPropertyNames(eval(type))
        }

        return prototypes
    }

    function isPrototypeFunction(type, prototype) {
        let isFunction = false
        try {
            isFunction = typeof eval(type + ".prototype." + prototype) === "function"
        } catch { }

        return isFunction
    }

    let functions = []
    let covered = []

    const types = getSupportedTypes()

    types.forEach(type => {
        const prototypes = getPrototypes(type)

        prototypes.forEach(prototype => {
            try {
                if (!covered.includes(prototype)) {
                    const isFunction = isPrototypeFunction(type, prototype)
                    if (isFunction) {
                        fun = `${prototype}: (...args)=>this.map(v=>{try{return v.${prototype}(...args)}catch{return v}}),`
                    } else {
                        fun = `get ${prototype}(){return this.that.map(v=>v.${prototype})},set ${prototype}(v){this.that.map(_=>{_.${prototype}=v})},`
                    }

                    covered.push(prototype)
                    if (fun !== "") functions.push(fun)
                }
            } catch (err) {
                console.log(err)
            }
        })
    })

    const code = `Object.defineProperty(Array.prototype, 'all', {get(){return{that:this,${functions.join("\n")}}},set(v){for(let i=0;i<this.length;i++){this[i]=v}}})`
    return code
}

eval(definePropertyAll())