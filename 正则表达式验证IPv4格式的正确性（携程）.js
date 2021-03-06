IPv4地址的长度为32位，分为4段，每段8位。用十进制表示，每段数字范围为0-255，段与段之间用英文句点“.”隔开，例如：112.22.33.4
关键在于怎么用正则来表示0-255范围内的数值
1、0-9：    \d
2、10-99：  [1-9]\d
3、0-99：   [1-9]?\d
4、0-99:    \d?\d
5、100-199：1\d{2}
6、0-199:   [0-1]?\d?\d
7、200-249: 2[0-4]\d
8、250-255: 25[0-5]
9、0-255:   25[0-5]|2[2-4]\d|[0-1]?\d?\d
这里的正则可以写成：
str='112.22.33.4';
var reg=/^(25[0-5]|2[2-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[2-4]\d|[0-1]?\d?\d)){3}$/;
reg.test(str);
