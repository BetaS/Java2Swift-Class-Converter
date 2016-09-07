# Java -> Swift2 Object Converter
This is a simple converter for Java Class to Swift2.x Class using regex

Online converter available : http://betas.github.io/Java2Swift-Class-Converter/

## Convert this -> self, null -> nil
## Function & Parameter Convert
[Origin]
```java
public int func1() {
  blahblahblah
}
```
[Converted]
```swift
func func1() -> Int {
  blahblahblah
}
```
## Constructor Convert
[Origin]
```java
class Test {
  public Test(int foo) {
    blahblahblah
  }
}
```
[Converted]
```swift
class Test {
  init(foo: Int) {
    blahblahblah
  }
}
```
## Variable Decleration Convert
[Origin]
```java
class Test {
  private int foo = 0;
  private String bar;
}
```
[Converted]
```swift
class Test {
  var foo: Int = 0;
  var bar: String = ""; // Auto generated default value as same as Java
}
```

# ToDo
* Support convert options
  * convert 'private' or 'protected' to 'internal'
  * spacing after ':' character
  * external parameter name to '_'
  * remove ';'
