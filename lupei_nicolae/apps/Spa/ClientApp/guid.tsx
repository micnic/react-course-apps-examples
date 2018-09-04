export default class Guid {
    public static newGuid(): string {
        var result = '';
        var hexcodes = "0123456789abcdef".split("");

        for (var index = 0; index < 32; index++) {
            var value = Math.floor(Math.random() * 16);

            switch (index) {
                case 8:
                    result += '-';
                    break;
                case 12:
                    value = 4;
                    result += '-';
                    break;
                case 16:
                    value = value & 3 | 8;
                    result += '-';
                    break;
                case 20:
                    result += '-';
                    break;
            }
            result += hexcodes[value];
        }
        return result;
    }
}